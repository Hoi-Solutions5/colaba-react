/**
 * src/App.jsx
 * Colaba.ai — Root component
 *
 * UPDATED: delegates routing to AppRouter, wraps tree with
 * AuthProvider + BookProvider for global state access on every page.
 */
import React           from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter       from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <AppRouter />
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
