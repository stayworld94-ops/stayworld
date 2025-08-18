/* StayWorld Auth Styles */
:root{
  --bg:#0b1220;
  --card:#0f1629;
  --text:#f2f5ff;
  --muted:#a8b2d1;
  --accent:#e9c46a;
  --accent-2:#43b581;
  --danger:#ef476f;
  --input:#101b34;
  --border:rgba(255,255,255,.08);
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji";
  background: radial-gradient(1000px 600px at 10% -10%, #14223d 0%, transparent 60%) , var(--bg);
  color:var(--text);
}
.header{
  display:flex;align-items:center;justify-content:space-between;
  gap:12px;padding:16px 20px;border-bottom:1px solid var(--border);backdrop-filter: blur(6px);
  position:sticky;top:0;z-index:5;background:linear-gradient(180deg, rgba(11,18,32,.75), rgba(11,18,32,.4));
}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:.4px}
.brand .logo{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#d4af37,#f2e08a);display:inline-block}
.brand span{font-size:18px}
.nav a{color:var(--muted);text-decoration:none;margin:0 8px;font-size:14px}
.nav a:hover{color:var(--text)}
.container{max-width:460px;margin:48px auto;padding:0 16px}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
.card h1{margin:0 0 8px;font-size:28px}
.sub{color:var(--muted);font-size:14px;margin:0 0 16px}
.form-row{display:flex;flex-direction:column;gap:8px;margin:12px 0}
label{font-size:14px;color:var(--muted)}
input{
  width:100%;padding:14px 12px;border-radius:12px;border:1px solid var(--border);
  background:var(--input);color:var(--text);outline:none;font-size:15px;
}
input::placeholder{color:#7f8cb3}
.btn{
  width:100%;padding:14px 16px;border:none;border-radius:12px;cursor:pointer;
  font-weight:700;font-size:15px;transition:transform .04s ease, box-shadow .2s ease, opacity .2s ease;
}
.btn:active{transform:translateY(1px)}
.btn-primary{background:linear-gradient(180deg,#f1d27a,#d8b24c);color:#111;box-shadow:0 8px 18px rgba(209,168,58,.2)}
.btn-primary:hover{opacity:.95}
.btn-google{display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#111}
.btn-ghost{background:transparent;border:1px dashed var(--border);color:var(--muted)}
.hr{display:flex;align-items:center;gap:12px;margin:14px 0}
.hr .line{height:1px;background:var(--border);flex:1}
.hr .text{color:var(--muted);font-size:12px}
.note{margin-top:12px;font-size:13px;color:var(--muted)}
.err{margin-top:10px;color:var(--danger);font-size:13px;display:none}
.success{margin-top:10px;color:var(--accent-2);font-size:13px;display:none}
.footer{margin:36px 0;color:var(--muted);font-size:12px;text-align:center}
a.link{color:#93c5fd;text-decoration:none}
a.link:hover{text-decoration:underline}
small.kicker{display:block;color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
@media (max-width:520px){
  .container{margin:24px auto}
  .card{padding:20px}
}
