export function showAlert(message) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "30px";
  popup.style.right = "30px";
  popup.style.background = "#222";
  popup.style.color = "#fff";
  popup.style.padding = "15px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "14px";
  popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  popup.innerText = message;
  document.body.appendChild(popup);
  setTimeout(() => document.body.removeChild(popup), 3000);
}