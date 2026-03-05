/**
 * src/services/authService.js
 * Colaba.ai — Authentication API calls (placeholder)
 */

import { api } from "./api";
import { STORAGE_KEYS } from "../utils/constants";
import { saveToStorage, removeFromStorage } from "../utils/helpers";

/**
 * Log in a user.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function login(credentials) {
  // TODO: replace with → const data = await api.post("/auth/login", credentials);
  const data = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          user: { id: "u1", name: "Usama Raees", email: credentials.email, role: "Lead UIUX Designer" },
          token: "mock_token_xyz",
        }),
      500
    )
  );
  localStorage.setItem("coloba_token", data.token);
  saveToStorage(STORAGE_KEYS.USER_PROFILE, data.user);
  return data;
}

/**
 * Log out the current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  // TODO: replace with → await api.post("/auth/logout");
  localStorage.removeItem("colaba_token");
  removeFromStorage(STORAGE_KEYS.USER_PROFILE);
}

/**
 * Get the currently authenticated user profile.
 * @returns {Promise<object>}
 */
export async function getCurrentUser() {
  // TODO: replace with → return api.get("/auth/me");
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          id: "u1",
          name: "Usama Raees",
          email: "usama@colaba.ai",
          role: "Lead UIUX Designer",
          avatar: null,
        }),
      200
    )
  );
}
