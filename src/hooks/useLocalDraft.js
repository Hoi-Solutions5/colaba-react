/**
 * src/hooks/useLocalDraft.js
 * Coloba.ai — Persist form state to localStorage with debounce
 *
 * Usage:
 *   const [text, setText] = useLocalDraft("book_sentence", "");
 */

import { useState, useEffect, useRef } from "react";
import { saveToStorage, loadFromStorage } from "../utils/helpers";

/**
 * @param {string} storageKey
 * @param {*}      initialValue
 * @param {number} debounceMs
 * @returns {[any, Function]}
 */
export function useLocalDraft(storageKey, initialValue = "", debounceMs = 600) {
  const [value, setValue] = useState(() => loadFromStorage(storageKey, initialValue));
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveToStorage(storageKey, value);
    }, debounceMs);

    return () => clearTimeout(timer.current);
  }, [value, storageKey, debounceMs]);

  return [value, setValue];
}
