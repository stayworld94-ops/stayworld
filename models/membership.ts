export const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 },
] as const;

export const DOWNGRADE_DAYS = 60;

export async function getMembershipSummary(db, userId: number) {
  const { rows: [{ total } = { total: 0 }] } = await db.query(
    `SELECT COALESCE(SUM(amount_krw),0) AS total FROM user_spend WHERE user_id=$1`, [userId]
  );
  const { rows: last = [] } = await db.query(
    `SELECT booked_at FROM user_spend WHERE user_id=$1 ORDER BY booked_at DESC LIMIT 1`, [userId]
  );
  const lastBookingISO = last[0]?.booked_at?.toISOString() ?? null;

  let levelIdx = 0;
  for (let i=0;i<LEVELS.length;i++) if (total >= LEVELS[i].minKRW) levelIdx = i;

  if (lastBookingISO) {
    const diffDays = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    if (diffDays >= DOWNGRADE_DAYS) levelIdx = Math.max(0, levelIdx - 1);
  }

  return {
    totalSpentKRW: Number(total),
    lastBookingISO,
    level: LEVELS[levelIdx].name,
    earnRate: LEVELS[levelIdx].rate
  };
}
