
// server/index.js  (ESM 버전)

import 'dotenv/config';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// 홈 체크
app.get('/', (_req, res) => {
  res.send('🚀 StayWorld API running!');
});

// DB 연결 체크
app.get('/db-check', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Database connection failed');
  }
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
