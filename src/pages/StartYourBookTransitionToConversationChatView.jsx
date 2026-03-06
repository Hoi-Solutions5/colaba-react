/**
 * src/pages/StartYourBookTransitionToConversationChatView.jsx
 * Colaba.ai — Chat View  |  Figma node 955:4728
 * Pixel-perfect implementation — modified only this file and its CSS.
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar          from "../components/Navbar";
import StepTabs        from "../components/StepTabs";
import { useBook }     from "../context/BookContext";
import { generateOutline } from "../services/bookService";
import { PATHS }       from "../utils/constants";
import { WORKFLOW_STEPS } from "../routes/routes";
import "./StartYourBookTransitionToConversationChatView.css";

/* ── Figma asset URLs (valid 7 days) ──────────────────────── */
const ICO_FOLDER  = "https://www.figma.com/api/mcp/asset/bd011ee5-7c31-4929-9e3d-f0e54e563331";
const ICO_PDF     = "https://www.figma.com/api/mcp/asset/fa450a2c-3e99-444a-9978-f71c8125e048";
const ICO_WORD    = "https://www.figma.com/api/mcp/asset/6aa3f59d-b44c-4a4a-91d8-2df259d871d9";
const ICO_INFO_L  = "https://www.figma.com/api/mcp/asset/1c31383d-e6a9-441e-be51-bf87589cb42d";
const ICO_INFO_R  = "https://www.figma.com/api/mcp/asset/1a1a6bb4-33ba-435a-80dd-ad9f04f7f16b";
const ICO_TICK_G  = "https://www.figma.com/api/mcp/asset/b80f4ed8-2148-4cfa-993d-e6fddf013ac2";
const ICO_CHK_GR  = "https://www.figma.com/api/mcp/asset/8c36f6bf-9956-4673-8dc9-ef443b5654a5";
const ICO_CIRC    = "https://www.figma.com/api/mcp/asset/c9c9e586-b03f-44d2-a7fa-d0031f603c6d";
const ICO_CIRC63  = "https://www.figma.com/api/mcp/asset/ff9fd280-110a-468f-939f-fc3fab131591";
const ICO_CIRC_GR = "https://www.figma.com/api/mcp/asset/72099452-ec18-472d-a880-e6dde5bdffa1";
const ICO_ADD     = "https://www.figma.com/api/mcp/asset/ced1d324-f2eb-460c-91fe-881bac340d1c";
const ICO_ADD_OUT = "https://www.figma.com/api/mcp/asset/b69fc8e2-fa1a-4972-8b4a-0e5a8cabe351";
const ICO_MIC     = "https://www.figma.com/api/mcp/asset/d77adc5c-300a-4453-b114-702a99b062ca";
const ICO_SEND    = "https://www.figma.com/api/mcp/asset/3af055d1-3d3b-4ec8-ba75-ecfa3ff5adfd";
const ICO_DOTS    = "https://www.figma.com/api/mcp/asset/31e85111-3dd3-47a9-881f-e9b7050eb019";
const ICO_DRAFT   = "https://www.figma.com/api/mcp/asset/9246ba7b-70d5-42e8-a95e-fa53fd9e457b";
const ICO_BRAIN   = "https://www.figma.com/api/mcp/asset/f6091a68-53c5-4363-90e4-c1db039652fb";
const IMG_THUMB   = "https://www.figma.com/api/mcp/asset/84ea4aad-e680-4277-95ea-33e43a54baa7";
const IMG_AI_AVA  = "https://www.figma.com/api/mcp/asset/d96a6ba1-7f12-49df-a29a-fb406d131310";

const ACTIVE = "Transition to Conversation";

const PROGRESS_ITEMS = [
  { label: "Vision",    status: "completed",   percent: null },
  { label: "Reader",    status: "in-progress", percent: 63   },
  { label: "Message",   status: "not-started", percent: null },
  { label: "Content",   status: "completed",   percent: null },
  { label: "Structure", status: "completed",   percent: null },
];

const TONE_TAGS     = ["#Calm", "#Authoritative", "#Minimalist", "#Minimalist"];
const AUDIENCE_TAGS = ["#Calm", "#Authoritative", "#Minimalist", "#Minimalist"];

const QUICK_ACTIONS = [
  "Highlight strong moments in my project",
  "Explain a plot twist",
  "Share a personal inspiration story",
];

/* ── Left: Source Material ──────────────────────────────── */
function SourcePanel() {
  const [files, setFiles] = useState([
    { name: "PPT on Design System", size: "64 KB of 64 KB", type: "pdf",  pct: 55 },
    { name: "Basic of UIUX",        size: "64 KB of 64 KB", type: "word", pct: 0  },
  ]);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext  = f.name.split(".").pop().toLowerCase();
    const type = ext === "pdf" ? "pdf" : "word";
    setFiles((prev) => [
      ...prev,
      { name: f.name, size: `${Math.round(f.size / 1024)} KB`, type, pct: 0 },
    ]);
    e.target.value = "";
  };

  return (
    <aside className="ccv-source">
      <div className="ccv-panel-header">
        <span className="ccv-panel-title">Source Material</span>
        <img src={ICO_INFO_L} alt="info" className="ccv-info-ic" />
      </div>

      {/* Upload zone */}
      <div
        className="ccv-upload"
        role="button" tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <img src={ICO_FOLDER} alt="" className="ccv-upload__icon" />
        <p className="ccv-upload__primary">Click to upload file, folder or drag and drop</p>
        <p className="ccv-upload__hint">PDF, word (.docx), PowerPoint (.pptx) - Max 50MB</p>
        <input
          ref={inputRef} type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <p className="ccv-files-label">Active Files</p>
      <div className="ccv-files">
        {files.map((f, i) => (
          <div className="ccv-file" key={i}>
            <img
              src={f.type === "pdf" ? ICO_PDF : ICO_WORD}
              alt={f.type}
              className="ccv-file__icon-img"
            />
            <div className="ccv-file__meta">
              <span className="ccv-file__name">{f.name}</span>
              <span className="ccv-file__size">{f.size}</span>
              {f.pct > 0 && (
                <div className="ccv-file__bar">
                  <div className="ccv-file__bar-fill" style={{ width: `${f.pct}%` }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ── Right: Discovery Progress ──────────────────────────── */
function StatusBadge({ status, percent }) {
  if (status === "completed")
    return (
      <span className="ccv-badge ccv-badge--done">
        <img src={ICO_CHK_GR} alt="" className="ccv-badge__ic" />
        Completed
      </span>
    );
  if (status === "not-started")
    return (
      <span className="ccv-badge ccv-badge--none">
        <img src={ICO_CIRC_GR} alt="" className="ccv-badge__ic" />
        Not Started
      </span>
    );
  return (
    <span className="ccv-badge ccv-badge--progress">
      <img src={ICO_CIRC63} alt="" className="ccv-badge__ic" />
      {percent}% In Progress
    </span>
  );
}

function DiscoveryPanel() {
  const done = PROGRESS_ITEMS.filter((p) => p.status === "completed").length;
  const pct  = Math.round((done / PROGRESS_ITEMS.length) * 100);

  return (
    <aside className="ccv-discovery">
      <div className="ccv-panel-header">
        <span className="ccv-panel-title ccv-panel-title--lg">Discovery Progress</span>
        <img src={ICO_INFO_R} alt="info" className="ccv-info-ic" />
      </div>

      {/* Master progress bar */}
      <div className="ccv-prog-track">
        <div className="ccv-prog-track__fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Items */}
      <div className="ccv-prog-list">
        {PROGRESS_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`ccv-prog-item${item.status === "in-progress" ? " ccv-prog-item--active" : ""}`}
          >
            <div className="ccv-prog-item__left">
              {item.status === "completed"
                ? <img src={ICO_TICK_G} alt="" className="ccv-prog-icon" />
                : <span className={`ccv-prog-dot${item.status === "in-progress" ? " ccv-prog-dot--amber" : ""}`} />
              }
              <span className="ccv-prog-item__label">{item.label}</span>
            </div>
            <StatusBadge status={item.status} percent={item.percent} />
          </div>
        ))}
      </div>

      {/* Current Tone */}
      <div className="ccv-tag-card">
        <p className="ccv-tag-card__title">Current Tone</p>
        <div className="ccv-tags__row">
          {TONE_TAGS.map((t, i) => <span key={i} className="ccv-tag">{t}</span>)}
        </div>
        <button className="ccv-tag-add">
          <img src={ICO_ADD_OUT} alt="" className="ccv-tag-add__ic" /> Add
        </button>
      </div>

      {/* Target Audience */}
      <div className="ccv-tag-card">
        <p className="ccv-tag-card__title">Target Audience</p>
        <div className="ccv-tags__row">
          {AUDIENCE_TAGS.map((t, i) => <span key={i} className="ccv-tag">{t}</span>)}
        </div>
        <button className="ccv-tag-add">
          <img src={ICO_ADD_OUT} alt="" className="ccv-tag-add__ic" /> Add
        </button>
      </div>
    </aside>
  );
}

/* ── Center: Chat ────────────────────────────────────────── */
function ChatPanel() {
  const [input,    setInput]    = useState("");
  const [thinking, setThinking] = useState(true);
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current)
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, []);

  const send = () => {
    if (!input.trim()) return;
    setInput("");
    setThinking(true);
    setTimeout(() => setThinking(false), 2000);
  };

  return (
    <section className="ccv-chat">

      {/* ── Message feed ── */}
      <div className="ccv-messages" ref={feedRef}>

        {/* AI #1 — Hello Alex */}
        <div className="ccv-msg ccv-msg--ai">
          <img src={IMG_AI_AVA} alt="AI" className="ccv-msg__avatar" />
          <div className="ccv-bubble ccv-bubble--ai">
            <strong className="ccv-bubble__bold">Hello Alex!</strong>
            <br /><br />
            <span className="ccv-bubble__body">
              I'm Colabat your personal AI writing guide. I've helped thousands of authors turn
              whispers of ideas into published works.
            </span>
            <br /><br />
            <strong className="ccv-bubble__bold">What masterpiece are we crafting today?</strong>
          </div>
        </div>

        {/* AI #2 — highlight blue — offset (no avatar) */}
        <div className="ccv-msg ccv-msg--ai ccv-msg--offset">
          <div className="ccv-bubble ccv-bubble--hl">
            Lets think about who need to hear this story. Who is the{" "}
            <strong>One Person</strong> you are writing this for?
          </div>
        </div>

        {/* User #1 — amber */}
        <div className="ccv-msg ccv-msg--user">
          <div className="ccv-bubble ccv-bubble--user">
            I think I'm writing for women in their mid-40s who feel stuck in their careers but
            feel it's too late to pivot. They feel successful on paper but empty inside.
          </div>
        </div>

        {/* AI #3 — "Golden Handcuffs" + chips */}
        <div className="ccv-msg ccv-msg--ai">
          <img src={IMG_AI_AVA} alt="AI" className="ccv-msg__avatar" />
          <div className="ccv-msg__body">
            <div className="ccv-bubble ccv-bubble--ai">
              That is a very powerful demographic. The{" "}
              <strong className="ccv-text-dark">"Golden Handcuffs"</strong> dilemma.
              <br /><br />
              Let's go deeper. If this reader picks up your book on a Sunday afternoon, what
              specific hope are they looking for? Is it permission to quit? Or a roadmap to
              change?
            </div>
            <div className="ccv-chips">
              {["Permission to quit", "Roadmap to change", "Something else..."].map((c) => (
                <button key={c} className="ccv-chip" onClick={() => setInput(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Thinking indicator */}
        {thinking && (
          <div className="ccv-thinking">
            <img src={ICO_DOTS} alt="" className="ccv-thinking__dots" />
            <span className="ccv-thinking__text">AI is incorporating your feedback...</span>
          </div>
        )}

        <div ref={feedRef} />
      </div>

      {/* ── Bottom input area ── */}
      <div className="ccv-input-area">

        {/* Quick chips — row above the box */}
        <div className="ccv-quick-chips">
          {QUICK_ACTIONS.map((a) => (
            <button key={a} className="ccv-qa-chip" onClick={() => setInput(a)}>{a}</button>
          ))}
        </div>

        {/* Outer box — bg #f8f8f8 */}
        <div className="ccv-input-outer">

          {/* Top row: attach + thumb stack */}
          <div className="ccv-thumbs-row">
            <button className="ccv-attach-btn" aria-label="Attach">
              <img src={ICO_ADD} alt="add" />
            </button>
            <div className="ccv-thumb-stack">
              <div className="ccv-thumb ccv-thumb--1">
               <img src="/images/previes.png" alt="" />
              </div>
              {/* <div className="ccv-thumb ccv-thumb--2">
                <img src={IMG_THUMB} alt="" />
              </div> */}
              <span className="ccv-thumb-count"></span>
            </div>
          </div>

          {/* White inner row with input + actions */}
          <div className="ccv-input-inner">
            <input
              className="ccv-input"
              type="text"
              placeholder="Ask anything...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              aria-label="Message"
            />
            <div className="ccv-input-actions">
              <img src={ICO_MIC} alt="mic" className="ccv-mic-ic" />
              <button className="ccv-send-btn" onClick={send}>
                <img src={ICO_SEND} alt="" className="ccv-send-ic" />
                Send
              </button>
            </div>
          </div>
        </div>

        <p className="ccv-disclaimer">
          Colaba can make mistakes. Consider check important information.
        </p>
      </div>
    </section>
  );
}

/* ════════════ PAGE ════════════ */
export default function StartYourBookTransitionToConversationChatView() {
  const navigate = useNavigate();
  const { draft, setOutline: setCtxOutline } = useBook();

  const handleCreateOutline = async () => {
    try {
      const result = await generateOutline({ sentence: draft.sentence, bookType: draft.bookType });
      setCtxOutline(result.outline);
      navigate(PATHS.OUTLINE_CREATION);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="ccv-page">
      <Navbar />

      <div className="ccv-shell">
        <StepTabs steps={WORKFLOW_STEPS} active={ACTIVE} />

        <div className="ccv-grid">
          <SourcePanel />
          <ChatPanel />
          <DiscoveryPanel />
        </div>
      </div>

      <footer className="ccv-footer">
        <button className="ccv-footer__save">
          <img src={ICO_DRAFT} alt="" className="ccv-footer__save-ic" />
          Save Draft
        </button>
        <span className="ccv-footer__autosave">Auto-saved at 10:45 AM</span>
        <button className="ccv-footer__outline" onClick={handleCreateOutline}>
          <img src={ICO_BRAIN} alt="" className="ccv-footer__outline-ic" />
          Create Outline
        </button>
      </footer>
    </div>
  );
}
