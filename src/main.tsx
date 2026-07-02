import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const el = document.getElementById("root");
if (el) {
  try {
    createRoot(el).render(<App />);
  } catch (e: any) {
    el.innerHTML = `<div style="padding:40px;font-family:sans-serif"><h2 style="color:red">Mount Error</h2><pre>${e?.message || e}</pre></div>`;
  }
}
