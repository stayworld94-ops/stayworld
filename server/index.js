// server/index.js

// .env 파일 불러오기
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

// Postgres 연결 풀 생성
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 미들웨어 (JSON 요청 처리)
app.use(express.json());

// ✅ 라우트: DB 연결 체크
app.get('/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Database connection failed');
  }
});

// ✅ 라우트: 샘플 API
app.get('/', (req, res) => {
  res.send('🚀 StayWorld API running!');
});

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
