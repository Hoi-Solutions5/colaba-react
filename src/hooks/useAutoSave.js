/**
 * src/hooks/useAutoSave.js
 * Colaba.ai — Auto-save hook: triggers saveFn after silence period
 *
 * Usage:
 *   const { lastSaved, isSaving } = useAutoSave(draft, saveDraft, 2000);
 */

import { useState, useEffect, useRef } from "react";

/**
 * @param {*}        data       — value to watch
 * @param {Function} saveFn     — async function to call
 * @param {number}   delayMs    — silence window before saving (default 2s)
 * @returns {{ lastSaved: Date|null, isSaving: boolean }}
 */
export function useAutoSave(data, saveFn, delayMs = 2000) {
  const [isSaving,  setIsSaving]  = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const timer   = useRef(null);
  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveFn(data);
        setLastSaved(new Date());
      } catch {
        /* swallow — UI can handle via error boundary */
      } finally {
        setIsSaving(false);
      }
    }, delayMs);

    return () => clearTimeout(timer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { lastSaved, isSaving };
}
