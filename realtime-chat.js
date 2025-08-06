import { db, ref, push, onChildAdded } from "./realtime-config.js";

const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const chatRef = ref(db, "messages");

form.onsubmit = async (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;
  await push(chatRef, { sender: "user", text: msg });
  await push(chatRef, { sender: "ai", text: "StayWorld 도우미입니다. 문의 감사합니다." });
  input.value = "";
};

onChildAdded(chatRef, (data) => {
  const d = data.val();
  const p = document.createElement("p");
  p.textContent = (d.sender === "user" ? "👤 " : "🤖 ") + d.text;
  chatbox.appendChild(p);
  chatbox.scrollTop = chatbox.scrollHeight;
});