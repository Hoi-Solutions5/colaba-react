/**
 * src/services/bookService.js
 * Colaba.ai — Book-related API calls (placeholder implementations)
 *
 * Replace the mock returns with real `api.*` calls once backend is ready.
 * Each function matches the exact shape your components expect.
 */

import { api } from "./api";

/* ─────────────────────────────────────────
   DRAFT
   ───────────────────────────────────────── */

/**
 * Save the current draft to the server.
 * @param {{ sentence: string, bookType: string }} payload
 * @returns {Promise<{ id: string, savedAt: string }>}
 */
export async function saveDraft(payload) {
  // TODO: replace with → return api.post("/drafts", payload);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: "draft_001", savedAt: new Date().toISOString() }), 400)
  );
}

/**
 * Load an existing draft by ID.
 * @param {string} draftId
 * @returns {Promise<object>}
 */
export async function loadDraft(draftId) {
  // TODO: replace with → return api.get(`/drafts/${draftId}`);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: draftId, sentence: "", bookType: "memoir" }), 300)
  );
}

/* ─────────────────────────────────────────
   OUTLINE
   ───────────────────────────────────────── */

/**
 * Generate a book outline from the provided sentence + type.
 * @param {{ sentence: string, bookType: string }} payload
 * @returns {Promise<{ outline: string[] }>}
 */
export async function generateOutline(payload) {
  // TODO: replace with → return api.post("/outlines/generate", payload);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          outline: [
            "Chapter 1 — The Beginning",
            "Chapter 2 — The Turning Point",
            "Chapter 3 — The Journey",
            "Chapter 4 — The Revelation",
            "Chapter 5 — The New Beginning",
          ],
        }),
      1200
    )
  );
}

/* ─────────────────────────────────────────
   BOOKS
   ───────────────────────────────────────── */

/**
 * Fetch all books for the current user.
 * @returns {Promise<object[]>}
 */
export async function getUserBooks() {
  // TODO: replace with → return api.get("/books");
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "b1", title: "My Life is Color...",   wordCount: 12000, status: "In Progress" },
          { id: "b2", title: "Reflections on N...",   wordCount:  8400, status: "Draft"       },
          { id: "b3", title: "The Art of Mindfu...",  wordCount:  5100, status: "In Progress" },
        ]),
      500
    )
  );
}

/**
 * Get a single book by ID.
 * @param {string} bookId
 * @returns {Promise<object>}
 */
export async function getBook(bookId) {
  // TODO: replace with → return api.get(`/books/${bookId}`);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: bookId, title: "Untitled Book", wordCount: 0 }), 300)
  );
}

/**
 * Update book metadata.
 * @param {string} bookId
 * @param {object} updates
 * @returns {Promise<object>}
 */
export async function updateBook(bookId, updates) {
  // TODO: replace with → return api.patch(`/books/${bookId}`, updates);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: bookId, ...updates }), 300)
  );
}

/* ─────────────────────────────────────────
   CHAT / AI
   ───────────────────────────────────────── */

/**
 * Send a chat message to the AI writing guide.
 * @param {{ message: string, conversationId?: string }} payload
 * @returns {Promise<{ reply: string, conversationId: string }>}
 */
export async function sendChatMessage(payload) {
  // TODO: replace with → return api.post("/chat/message", payload);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          reply: "That's a great direction! Let's explore this further...",
          conversationId: payload.conversationId || "conv_001",
        }),
      800
    )
  );
}
