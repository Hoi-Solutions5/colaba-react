/**
 * src/utils/helpers.js
 * Colaba.ai — Shared utility helpers
 */

/**
 * Truncate a string to maxLen characters, appending ellipsis if cut.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 80) {
  if (!str) return "";
  return str.length > maxLen ? str.slice(0, maxLen).trimEnd() + "…" : str;
}

/**
 * Format a word count number to a readable label.
 * @param {number} count
 * @returns {string}
 */
export function formatWordCount(count) {
  if (!count) return "0 words";
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
  return `${count} words`;
}

/**
 * Build a CSS class string from a base class and an optional modifier map.
 * @param {string} base
 * @param {Record<string, boolean>} mods
 * @returns {string}
 */
export function cx(base, mods = {}) {
  const extras = Object.entries(mods)
    .filter(([, active]) => active)
    .map(([cls]) => cls);
  return [base, ...extras].join(" ").trim();
}

/**
 * Save a value to localStorage safely (handles SSR / private browsing).
 * @param {string} key
 * @param {*} value
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* silent */
  }
}

/**
 * Load a value from localStorage safely.
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function loadFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Remove a value from localStorage safely.
 * @param {string} key
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* silent */
  }
}

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generate a simple random ID string.
 * @returns {string}
 */
export function genId() {
  return Math.random().toString(36).slice(2, 9);
}
