/**
 * src/services/api.js
 * Colaba.ai — Base HTTP client
 * Replace API_BASE in .env:  VITE_API_URL=https://api.colaba.ai
 */

import { API_BASE } from "../utils/constants";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Core fetch wrapper with error handling.
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("colaba_token");

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  get:    (endpoint)       => request(endpoint, { method: "GET" }),
  post:   (endpoint, body) => request(endpoint, { method: "POST",   body: JSON.stringify(body) }),
  put:    (endpoint, body) => request(endpoint, { method: "PUT",    body: JSON.stringify(body) }),
  patch:  (endpoint, body) => request(endpoint, { method: "PATCH",  body: JSON.stringify(body) }),
  delete: (endpoint)       => request(endpoint, { method: "DELETE" }),
};
