/**
 * src/context/BookContext.jsx
 * Colaba.ai — Global book / draft state shared across all pages
 *
 * Usage:
 *   import { useBook } from "../context/BookContext";
 *   const { draft, setDraft, outline, setOutline } = useBook();
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import { STORAGE_KEYS }                  from "../utils/constants";
import { saveToStorage, loadFromStorage } from "../utils/helpers";

/* ─── Shape ─── */
const DEFAULT_DRAFT = {
  sentence:  "",
  bookType:  "memoir",
  savedAt:   null,
  draftId:   null,
};

/* ─── Context ─── */
const BookContext = createContext(null);

/* ─── Provider ─── */
export function BookProvider({ children }) {
  const [draft,   setDraftState]   = useState(() => loadFromStorage(STORAGE_KEYS.DRAFT, DEFAULT_DRAFT));
  const [outline, setOutline]      = useState([]);
  const [books,   setBooks]        = useState([]);
  const [loading, setLoading]      = useState(false);
  const [error,   setError]        = useState(null);

  /** Persist draft to state + localStorage */
  const setDraft = useCallback((updates) => {
    setDraftState((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(STORAGE_KEYS.DRAFT, next);
      return next;
    });
  }, []);

  /** Clear draft */
  const resetDraft = useCallback(() => {
    setDraftState(DEFAULT_DRAFT);
    saveToStorage(STORAGE_KEYS.DRAFT, DEFAULT_DRAFT);
  }, []);

  const value = {
    draft,
    setDraft,
    resetDraft,
    outline,
    setOutline,
    books,
    setBooks,
    loading,
    setLoading,
    error,
    setError,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

/** Custom hook — throws if used outside <BookProvider> */
export function useBook() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used inside <BookProvider>");
  return ctx;
}
