/**
 * src/hooks/useBook.js
 * Colaba.ai — Hook for book actions wired to BookContext + bookService
 *
 * Usage:
 *   const { saving, handleSaveDraft, handleGenerateOutline } = useBookActions();
 */

import { useState, useCallback } from "react";
import { useNavigate }           from "react-router-dom";
import { useBook }               from "../context/BookContext";
import { saveDraft, generateOutline } from "../services/bookService";
import { PATHS }                 from "../utils/constants";

export function useBookActions() {
  const navigate             = useNavigate();
  const { draft, setDraft, setOutline, setLoading } = useBook();
  const [saving,   setSaving]   = useState(false);
  const [saving_,  setSaveErr]  = useState(null);
  const [genError, setGenError] = useState(null);

  /** Save draft and update context */
  const handleSaveDraft = useCallback(async () => {
    setSaving(true);
    setSaveErr(null);
    try {
      const result = await saveDraft({ sentence: draft.sentence, bookType: draft.bookType });
      setDraft({ draftId: result.id, savedAt: result.savedAt });
    } catch (err) {
      setSaveErr(err.message);
    } finally {
      setSaving(false);
    }
  }, [draft, setDraft]);

  /** Generate outline and navigate to Chat Start */
  const handleLetsDraft = useCallback(async () => {
    await handleSaveDraft();
    navigate(PATHS.CHAT_START);
  }, [handleSaveDraft, navigate]);

  /** Generate outline from Chat View and navigate forward */
  const handleCreateOutline = useCallback(async () => {
    setLoading(true);
    setGenError(null);
    try {
      const result = await generateOutline({ sentence: draft.sentence, bookType: draft.bookType });
      setOutline(result.outline);
      navigate(PATHS.OUTLINE_CREATION);
    } catch (err) {
      setGenError(err.message);
    } finally {
      setLoading(false);
    }
  }, [draft, setOutline, setLoading, navigate]);

  return {
    saving,
    saveError: saving_,
    genError,
    handleSaveDraft,
    handleLetsDraft,
    handleCreateOutline,
  };
}
