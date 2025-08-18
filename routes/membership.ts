import { Router } from 'express';
import { getMembershipSummary } from '../models/membership';
import { Pool } from 'pg';

const router = Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// balance 조회
async function getPointsBalance(userId:number){
  const { rows:[r] } = await db.query(`SELECT balance FROM points_balance WHERE user_id=$1`, [userId]);
  return r?.balance ?? 0;
}

// ledger 기록
async function addLedger(userId:number, delta:number, type:'earn'|'burn'|'adjust'|'revert', ref?:string, meta?:any){
  await db.query('BEGIN');
  try{
    await db.query(
      `INSERT INTO points_ledger(user_id,type,points,ref,meta) VALUES ($1,$2,$3,$4,$5)`,
      [userId, type, delta, ref||null, meta||{}]
    );
    await db.query(
      `INSERT INTO points_balance(user_id,balance) VALUES ($1,$2)
       ON CONFLICT (user_id) DO UPDATE SET balance=points_balance.balance + EXCLUDED.balance, updated_at=now()`,
      [userId, delta]
    );
    await db.query('COMMIT');
  }catch(e){ await db.query('ROLLBACK'); throw e; }
}

// --- API --- //
router.get('/me/membership', async (req,res)=>{
  const userId = Number(req.headers['x-user-id']); // 인증 헤더 예시
  const summary = await getMembershipSummary(db, userId);
  const points  = await getPointsBalance(userId);
  res.json({ ...summary, points });
});

router.post('/points/earn', async (req,res)=>{
  const { userId, bookingId, amountKRW } = req.body;
  const exists = await db.query(`SELECT 1 FROM points_ledger WHERE ref=$1 AND type='earn' LIMIT 1`, [bookingId]);
  if (exists.rowCount) return res.json({ duplicated:true });

  await db.query(`INSERT INTO user_spend(user_id, amount_krw, booked_at, ref) VALUES ($1,$2,now(),$3)`,
    [userId, amountKRW, bookingId]);

  const { earnRate } = await getMembershipSummary(db, userId);
  const points = Math.floor(amountKRW * earnRate / 100);
  await addLedger(userId, +points, 'earn', bookingId, { amountKRW, earnRate });
  const balance = await getPointsBalance(userId);
  res.json({ pointsEarned: points, balance });
});

router.post('/points/burn', async (req,res)=>{
  const userId = Number(req.headers['x-user-id']);
  const { usePoints, paymentIntentId } = req.body;
  const exists = await db.query(`SELECT 1 FROM points_ledger WHERE ref=$1 AND type='burn' LIMIT 1`, [paymentIntentId]);
  if (exists.rowCount) return res.json({ duplicated:true });

  const balance = await getPointsBalance(userId);
  if (usePoints <= 0 || usePoints > balance) return res.status(400).json({ error:'INSUFFICIENT_POINTS' });
  await addLedger(userId, -usePoints, 'burn', paymentIntentId);
  const after = await getPointsBalance(userId);
  res.json({ pointsUsed: usePoints, balance: after });
});

router.post('/points/revert', async (req,res)=>{
  const { ref, mode } = req.body; // 'burn' | 'earn'
  const row = await db.query(`SELECT user_id, points FROM points_ledger WHERE ref=$1 AND type=$2 LIMIT 1`, [ref, mode]);
  if (!row.rowCount) return res.json({ ok:true, skipped:true });
  const { user_id, points } = row.rows[0];
  const delta = (mode==='burn') ? +Math.abs(points) : -Math.abs(points);
  await addLedger(user_id, delta, 'revert', `revert:${ref}`, { mode });
  const bal = await getPointsBalance(user_id);
  res.json({ ok:true, balance: bal });
});

export default router;
