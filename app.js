document.getElementById("chat-toggle").addEventListener("click", () => {
  const win = document.getElementById("chat-window");
  win.style.display = win.style.display === "flex" ? "none" : "flex";
});

document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  input.value = "";

  const res = await fetch("/.netlify/functions/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, lang: currentLang })
  });

  const data = await res.json();
  appendMessage("bot", data.reply);
});

function appendMessage(sender, text) {
  const chat = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
