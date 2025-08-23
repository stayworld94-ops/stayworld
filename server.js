// server.js
// STAYWORLD — Booking Confirmation + Email System
// Requirements: Node 18+, npm i express dotenv nodemailer pdfkit better-sqlite3 jsonwebtoken dayjs

import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import PDFDocument from 'pdfkit'
import Database from 'better-sqlite3'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ============================
// 1) ENV & BASIC CONFIG
// ============================
const PORT = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

// SMTP (use Gmail/SendGrid/SES etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(process.env.SMTP_SECURE === 'true'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// quick health check for SMTP (optional on startup)
transporter.verify().then(()=>{
  console.log('[SMTP] Ready to send')
}).catch(err=>{
  console.warn('[SMTP] Verify failed:', err.message)
})

// ============================
// 2) DB (SQLite — file: bookings.db)
// ============================
const db = new Database(path.join(__dirname, 'bookings.db'))
db.pragma('journal_mode = WAL')
db.exec(`
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  property_name TEXT NOT NULL,
  property_address TEXT,
  checkin_date TEXT NOT NULL,
  checkout_date TEXT NOT NULL,
  nights INTEGER NOT NULL,
  total_price REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'CONFIRMED',
  created_at TEXT NOT NULL
);
`)

// ============================
// 3) EXPRESS APP
// ============================
const app = express()
app.use(express.json())
app.get('/', (req,res)=>res.send('StayWorld Booking Email API OK'))

// Helpers
const makeId = () => 'SW' + Math.random().toString(36).slice(2,8).toUpperCase()

function createBookingPDF(booking){
  const doc = new PDFDocument({ margin: 50 })
  const chunks = []
  doc.on('data', (c)=>chunks.push(c))
  return new Promise((resolve)=>{
    doc.on('end', ()=>resolve(Buffer.concat(chunks)))

    // Header
    doc
      .fontSize(18).text('STAYWORLD — 예약 확인서', { align: 'center' })
      .moveDown(0.5)
      .fontSize(10).text(`발행일: ${dayjs().format('YYYY-MM-DD HH:mm')}`, { align: 'center' })
      .moveDown(1)

    // Booking Summary Box
    doc
      .rect(50, doc.y, 495, 90).stroke()
      .moveDown(0.2)
      .fontSize(12)
      .text(`예약번호: ${booking.id}`)
      .text(`예약상태: ${booking.status}`)
      .text(`예약자: ${booking.guest_name} <${booking.guest_email}>`)
      .text(`결제: ${booking.total_price.toFixed(2)} ${booking.currency} (${booking.payment_method || 'N/A'})`)
      .moveDown(1)

    // Stay Details
    doc.fontSize(13).text('숙박 정보', { underline: true })
    doc.moveDown(0.4)
    doc.fontSize(12)
      .text(`숙소: ${booking.property_name}`)
      .text(`주소: ${booking.property_address || '-'}`)
      .text(`체크인: ${booking.checkin_date}`)
      .text(`체크아웃: ${booking.checkout_date}`)
      .text(`숙박일수: ${booking.nights}박`)
      .moveDown(1)

    doc.fontSize(11).text('취소/변경은 아래 링크에서 관리할 수 있습니다.')
    doc.fillColor('blue').text(`${BASE_URL}/bookings/${booking.id}`, { link: `${BASE_URL}/bookings/${booking.id}` })
    doc.fillColor('black')

    doc.moveDown(2)
    doc.fontSize(9).text('※ 본 확인서는 StayWorld에서 자동으로 생성되었습니다. 궁금한 점이 있으면 고객센터로 문의해 주세요.')

    doc.end()
  })
}

function bookingEmailHTML(booking, manageUrl){
  return `
  <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111">
    <h2>예약이 확정되었습니다 ✅</h2>
    <p><b>${booking.guest_name}</b>님, STAYWORLD 예약을 확인드립니다.</p>

    <table style="border-collapse:collapse;min-width:480px">
      <tbody>
        <tr>
          <td style="padding:8px;border:1px solid #eee">예약번호</td>
          <td style="padding:8px;border:1px solid #eee"><b>${booking.id}</b></td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">숙소</td>
          <td style="padding:8px;border:1px solid #eee">${booking.property_name}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">주소</td>
          <td style="padding:8px;border:1px solid #eee">${booking.property_address || '-'}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">체크인</td>
          <td style="padding:8px;border:1px solid #eee">${booking.checkin_date}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">체크아웃</td>
          <td style="padding:8px;border:1px solid #eee">${booking.checkout_date}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">숙박일수</td>
          <td style="padding:8px;border:1px solid #eee">${booking.nights}박</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">결제</td>
          <td style="padding:8px;border:1px solid #eee">${booking.total_price.toFixed(2)} ${booking.currency} (${booking.payment_method || 'N/A'})</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee">상태</td>
          <td style="padding:8px;border:1px solid #eee"><b>${booking.status}</b></td>
        </tr>
      </tbody>
    </table>

    <p style="margin-top:18px">
      예약 관리(취소/변경): <a href="${manageUrl}">${manageUrl}</a>
    </p>

    <p>즐거운 여행 되세요!<br/>— STAYWORLD</p>
  </div>
  `
}

// ============================
// 4) API — Create Booking → PDF → Email
// ============================
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      guest_name,
      guest_email,
      property_name,
      property_address,
      checkin_date, // YYYY-MM-DD
      checkout_date, // YYYY-MM-DD
      total_price,
      currency = 'USD',
      payment_method = 'CARD'
    } = req.body

    if(!guest_name || !guest_email || !property_name || !checkin_date || !checkout_date || !total_price){
      return res.status(400).json({ ok:false, error:'Missing fields' })
    }

    const nights = dayjs(checkin_date).isValid() && dayjs(checkout_date).isValid()
      ? dayjs(checkout_date).diff(dayjs(checkin_date), 'day')
      : 0

    const id = makeId()
    const booking = {
      id,
      guest_name,
      guest_email,
      property_name,
      property_address: property_address || null,
      checkin_date,
      checkout_date,
      nights: Math.max(nights, 1),
      total_price: Number(total_price),
      currency,
      payment_method,
      status: 'CONFIRMED',
      created_at: dayjs().toISOString()
    }

    db.prepare(`INSERT INTO bookings (
      id, guest_name, guest_email, property_name, property_address,
      checkin_date, checkout_date, nights, total_price, currency,
      payment_method, status, created_at
    ) VALUES (@id, @guest_name, @guest_email, @property_name, @property_address,
      @checkin_date, @checkout_date, @nights, @total_price, @currency,
      @payment_method, @status, @created_at)`).run(booking)

    const token = jwt.sign({ bid: id, action: 'manage' }, JWT_SECRET, { expiresIn: '14d' })
    const manageUrl = `${BASE_URL}/bookings/${id}?token=${token}`

    // PDF
    const pdfBuffer = await createBookingPDF(booking)

    // Email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || `StayWorld <no-reply@stayworldbooking.com>`,
      to: booking.guest_email,
      subject: `[STAYWORLD] 예약 확정 — ${booking.id}`,
      html: bookingEmailHTML(booking, manageUrl),
      attachments: [
        { filename: `StayWorld_${booking.id}.pdf`, content: pdfBuffer }
      ]
    })

    res.json({ ok:true, booking, manage_url: manageUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok:false, error: err.message })
  }
})

// ============================
// 5) Booking detail (for manage page link)
// ============================
app.get('/bookings/:id', (req,res)=>{
  const id = req.params.id
  const token = req.query.token
  try {
    if(!token) return res.status(401).send('Unauthorized: missing token')
    jwt.verify(String(token), JWT_SECRET)
  } catch (e) {
    return res.status(401).send('Unauthorized: invalid/expired token')
  }

  const row = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id)
  if(!row) return res.status(404).send('Not Found')

  res.setHeader('Content-Type','text/html; charset=utf-8')
  res.end(`
    <html><head><meta charset="utf-8" /><title>Booking ${row.id}</title></head>
    <body style="font-family:Arial, sans-serif; padding:24px; max-width:720px; margin:0 auto;">
      <h2>예약 관리</h2>
      <p>예약번호: <b>${row.id}</b> / 상태: <b>${row.status}</b></p>
      <p>체크인 ${row.checkin_date} ~ 체크아웃 ${row.checkout_date} (${row.nights}박)</p>
      <p>숙소: ${row.property_name}<br/>주소: ${row.property_address || '-'}</p>
      <p>결제: ${row.total_price.toFixed(2)} ${row.currency} (${row.payment_method || 'N/A'})</p>

      ${row.status !== 'CANCELLED' ? `
      <form method="POST" action="/api/bookings/${row.id}/cancel" style="margin-top:16px;">
        <input type="hidden" name="token" value="${token}" />
        <label>취소 사유: <input name="reason" style="width:360px" /></label>
        <button type="submit" style="margin-left:8px">예약 취소</button>
      </form>` : '<p>이미 취소된 예약입니다.</p>'}

    </body></html>
  `)
})

// to parse form POST from the manage page
app.use(express.urlencoded({ extended: true }))

// ============================
// 6) Cancel endpoint (updates DB + sends email)
// ============================
app.post('/api/bookings/:id/cancel', async (req,res)=>{
  const id = req.params.id
  const { token, reason } = req.body
  try {
    if(!token) throw new Error('Missing token')
    jwt.verify(String(token), JWT_SECRET)

    const row = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id)
    if(!row) return res.status(404).send('Not Found')
    if(row.status === 'CANCELLED') return res.redirect(`/bookings/${id}?token=${token}`)

    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run('CANCELLED', id)

    // notify guest
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || `StayWorld <no-reply@stayworldbooking.com>`,
      to: row.guest_email,
      subject: `[STAYWORLD] 예약 취소 안내 — ${row.id}`,
      html: `
        <p>${row.guest_name}님, 아래 예약이 취소되었습니다.</p>
        <ul>
          <li>예약번호: <b>${row.id}</b></li>
          <li>숙소: ${row.property_name}</li>
          <li>체크인: ${row.checkin_date} / 체크아웃: ${row.checkout_date}</li>
        </ul>
        <p>취소 사유: ${reason || '-'}</p>
        <p>환불 규정에 따라 처리됩니다. 문의가 있으면 답장해 주세요.</p>
      `
    })

    res.redirect(`/bookings/${id}?token=${token}`)
  } catch (err) {
    console.error(err)
    res.status(401).send('Unauthorized')
  }
})

// ============================
// 7) Admin: list bookings (simple)
// ============================
app.get('/api/bookings', (req,res)=>{
  const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100').all()
  res.json({ ok:true, rows })
})

// ============================
// 8) Start server
// ============================
app.listen(PORT, ()=>{
  console.log(`StayWorld Email API listening on ${PORT}`)
  console.log(`Create booking: POST ${BASE_URL}/api/bookings`)
})
