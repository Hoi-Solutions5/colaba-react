/**
 * src/main.jsx — Vite entry point
 * npm install  →  npm run dev
 */
import React    from "react";
import ReactDOM from "react-dom/client";
import App      from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
