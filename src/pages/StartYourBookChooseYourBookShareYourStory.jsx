/**
 * src/pages/StartYourBookChooseYourBookShareYourStory.jsx
 * Colaba.ai — "Start Your Book - Choose Your Book & Share Your Story"
 * node-id: 955:4588
 *
 * UPDATED: buttons wired to useNavigate + BookContext + bookService
 */
import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import MainLayout          from "../layout/MainLayout";
import StepTabs            from "../components/StepTabs";
import { useBook }         from "../context/BookContext";
import { saveDraft }       from "../services/bookService";
import { PATHS }           from "../utils/constants";
import { WORKFLOW_STEPS }  from "../routes/routes";
import {
  IMG_BOOK_ILLUSTRATION, IMG_MEMOIR_CHAR, IMG_SELFHELP_CHAR,
  IMG_SAVE_DRAFT_ICON, IMG_BRAIN_SPARKLE, IMG_STARS_ICON,
} from "../assets/index";
import "./StartYourBookChooseYourBookShareYourStory.css";

const ACTIVE = "Choose Your Book & Share Your Story";

const MEMOIR_TAGS   = ["Life story","family history","overcoming adversity","career journey"];
const SELFHELP_TAGS = ["Personal development","business wisdom","health & wellness","professional skills"];

function FooterBar({ onSave, onDraft, saving }) {
  return (
    <div className="cyb-footer">
      <button className="cyb-btn-save" onClick={onSave} disabled={saving}>
        <img src={IMG_SAVE_DRAFT_ICON} alt="" />
        {saving ? "Saving…" : "Save Draft"}
      </button>
      <span className="cyb-footer__autosave">Auto-saved at 10:45 AM</span>
      <div className="cyb-footer__right">
        <span className="cyb-footer__hint">Don't overthink it — we'll explore the details together</span>
        <button className="cyb-btn-draft" onClick={onDraft}>
          <img src={IMG_BRAIN_SPARKLE} alt="" />Let's Draft
        </button>
      </div>
    </div>
  );
}

export default function StartYourBookChooseYourBookShareYourStory() {
  const navigate            = useNavigate();
  const { draft, setDraft } = useBook();
  const [selected, setSelected] = useState(draft.bookType || "memoir");
  const [text, setText]     = useState(draft.sentence || "");
  const [saving, setSaving] = useState(false);

  const pick = (id) => { setSelected(id); setDraft({ bookType: id }); };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setDraft({ sentence: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await saveDraft({ sentence: text, bookType: selected });
      setDraft({ draftId: result.id, savedAt: result.savedAt });
    } finally { setSaving(false); }
  };

  const handleDraft = async () => {
    await handleSave();
    navigate(PATHS.CHAT_START);
  };

  return (
    <MainLayout footer={<FooterBar onSave={handleSave} onDraft={handleDraft} saving={saving} />} noPadding>
      <StepTabs steps={WORKFLOW_STEPS} active={ACTIVE} />

      <div className="cyb-scroll-area">
        <div className="cyb-body">

          <div className="cyb-hero-img-wrap">
            <img src={IMG_BOOK_ILLUSTRATION} alt="" className="cyb-hero-img" />
          </div>

          <div className="cyb-headline">
            <h1 className="cyb-headline__title">Ready to Write? Let's get started!</h1>
            <p className="cyb-headline__sub">Briefly describe your book idea below to generate your high-level structure</p>
          </div>

          <div className="cyb-form">

            {/* ── Section 1 ── */}
            <div className="cyb-form__section">
              <div className="cyb-form__label-row">
                <label className="cyb-form__label" htmlFor="book-sentence">In one sentence, what's your book about?</label>
                <button className="cyb-btn-autotune"><img src={IMG_STARS_ICON} alt="" />Auto Tune</button>
              </div>
              <div className="cyb-textarea-wrap">
                <div className="cyb-suggestions">
                  <button className="cyb-suggestion-chip" onClick={() => setText("How I rebuilt my life after losing everything at 40")}>
                    How I rebuilt my life after losing everything at 40
                  </button>
                  <button className="cyb-suggestion-chip" onClick={() => setText("A practical guide to overcoming imposter syndrome for new managers")}>
                    A practical guide to overcoming imposter syndrome for new managers
                  </button>
                </div>
                <textarea
                  id="book-sentence"
                  className="cyb-textarea"
                  placeholder="Who is the course for, what should they learn, and why?"
                  value={text}
                  onChange={handleTextChange}
                  maxLength={280}
                />
                <div className="cyb-textarea__counter">{text.length}/280</div>
              </div>
            </div>

            {/* ── Section 2 ── */}
            <div className="cyb-form__section">
              <p className="cyb-form__label">What kind of book do you want to write?</p>
              <div className="cyb-book-types">

                <div className={`cyb-type-card ${selected === "memoir" ? "cyb-type-card--active" : ""}`}
                  onClick={() => pick("memoir")} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && pick("memoir")} aria-pressed={selected === "memoir"}>
                  <img src={IMG_MEMOIR_CHAR} alt="" className="cyb-type-card__img" />
                  <div className="cyb-type-card__info">
                    <div>
                      <h3 className="cyb-type-card__title">Memoir</h3>
                      <p className="cyb-type-card__sub">I want to share my personal story</p>
                    </div>
                    <div className="cyb-tag-group">
                      {MEMOIR_TAGS.map((t) => <span className="cyb-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>

                <div className={`cyb-type-card ${selected === "selfhelp" ? "cyb-type-card--active" : ""}`}
                  onClick={() => pick("selfhelp")} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && pick("selfhelp")} aria-pressed={selected === "selfhelp"}>
                  <img src={IMG_SELFHELP_CHAR} alt="" className="cyb-type-card__img" />
                  <div className="cyb-type-card__info">
                    <div>
                      <h3 className="cyb-type-card__title">Self-Help</h3>
                      <p className="cyb-type-card__sub">I want to share my expertise</p>
                    </div>
                    <div className="cyb-tag-group">
                      {SELFHELP_TAGS.map((t) => <span className="cyb-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
