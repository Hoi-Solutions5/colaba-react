/**
 * src/utils/constants.js
 * Colaba.ai — App-wide constants
 */

export const APP_NAME = "Colaba.ai";
export const API_BASE = import.meta.env.VITE_API_URL || "https://api.colaba.ai";

/* ── Workflow step paths ── */
export const PATHS = {
  DASHBOARDS:           "/dashboards",
  DASHBOARDS_EMPTY:     "/dashboards-empty-state",
  START_YOUR_BOOK:      "/start-your-book",
  CHAT_START:           "/start-your-book-transition-chat-start",
  CHAT_VIEW:            "/start-your-book-transition-chat-view",
  OUTLINE_CREATION:     "/outline-creation",
  PUBLISHING:           "/publishing",
  SETTINGS:             "/settings",
};

/* ── Book types ── */
export const BOOK_TYPES = {
  MEMOIR:    "memoir",
  SELF_HELP: "selfhelp",
  NON_FICT:  "nonfic",
  FREE_WRITE:"start",
};

/* ── Discovery progress statuses ── */
export const PROGRESS_STATUS = {
  COMPLETED:   "completed",
  IN_PROGRESS: "in-progress",
  NOT_STARTED: "not-started",
};

/* ── Local storage keys ── */
export const STORAGE_KEYS = {
  DRAFT:         "colaba_draft",
  USER_PROFILE:  "colaba_user",
  BOOK_PROGRESS: "colaba_book_progress",
};
