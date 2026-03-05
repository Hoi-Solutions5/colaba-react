/**
 * src/pages/StartYourBookTransitionToConversationChatView.jsx
 * Colaba.ai — "Start Your Book - Transition to Conversation - Chat View"
 * node-id: 955:5743
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate }   from "react-router-dom";
import Navbar            from "../components/Navbar";
import StepTabs          from "../components/StepTabs";
import { useBook }       from "../context/BookContext";
import { sendChatMessage, generateOutline } from "../services/bookService";
import { PATHS }         from "../utils/constants";
import { WORKFLOW_STEPS } from "../routes/routes";
import "./StartYourBookTransitionToConversationChatView.css";

const ACTIVE = "Transition to Conversation";

/* ── Discovery items ── */
const PROGRESS_ITEMS = [
  { label: "Vision",    status: "completed",   percent: null },
  { label: "Reader",    status: "in-progress", percent: 65   },
  { label: "Message",   status: "not-started", percent: null },
  { label: "Context",   status: "completed",   percent: null },
  { label: "Structure", status: "completed",   percent: null },
];

/* ── Seed messages ── */
const SEED_MESSAGES = [
  {
    id: 1, role: "ai",
    parts: [
      { t: "strong", v: "Hello Alex!\n" },
      { t: "text",   v: "I'm Colaba! your personal AI writing guide. I've helped thousands of authors turn whispers of ideas into published works.\n\n" },
      { t: "text",   v: "What masterpiece are we crafting today?" },
    ],
  },
  {
    id: 2, role: "ai", highlight: true,
    parts: [
      { t: "text",   v: "Lets think about who need to hear this story. Who is the " },
      { t: "strong", v: "One Person" },
      { t: "text",   v: " you are writing this for?" },
    ],
  },
  {
    id: 3, role: "user",
    text: "I think I'm writing for women in their mid-40s who feel stuck in their careers but feel it's too late to pivot. They feel successful on paper but empty inside.",
  },
  {
    id: 4, role: "ai",
    parts: [
      { t: "text",   v: "That is a very powerful demographic. The " },
      { t: "orange", v: '"Golden Handcuffs"' },
      { t: "text",   v: " dilemma.\n\nLet's go deeper. If this reader picks up your book on a Sunday afternoon, what specific hope are they looking for? Is it permission to quit? Or a roadmap to change?" },
    ],
    chips: ["Permission to quit", "Roadmap to change", "Something else..."],
  },
];

const QUICK_ACTIONS = [
  "Highlight strong moments in my project",
  "Explain a plot twist",
  "Share a personal inspiration story",
];

/* ── Status badge ── */
function StatusBadge({ status, percent }) {
  if (status === "completed")   return <span className="ccv-badge ccv-badge--done">Completed</span>;
  if (status === "not-started") return <span className="ccv-badge ccv-badge--none">Not Started</span>;
  return <span className="ccv-badge ccv-badge--progress">{percent}% In Progress</span>;
}

/* ── Left: Source Material ── */
function SourcePanel() {
  return (
    <aside className="ccv-source">
      <div className="ccv-panel-header">
        <span className="ccv-panel-title">Source Material</span>
        <button className="ccv-info-btn" aria-label="Info">ⓘ</button>
      </div>

      <div className="ccv-upload" role="button" tabIndex={0} aria-label="Upload source file">
        <span className="ccv-upload__icon">🗂️</span>
        <p className="ccv-upload__primary">Click to upload No. folder or drag and drop</p>
        <p className="ccv-upload__hint">PDF Word (docx), PowerPoint (pptx) · Max 10MB</p>
      </div>

      <p className="ccv-files-label">Active Files</p>

      <div className="ccv-files">
        <div className="ccv-file">
          <div className="ccv-file__icon ccv-file__icon--ppt">PPT</div>
          <div className="ccv-file__meta">
            <span className="ccv-file__name">PPT on Design System</span>
            <div className="ccv-file__bar"><div className="ccv-file__bar-fill" style={{ width: "72%" }} /></div>
          </div>
        </div>
        <div className="ccv-file">
          <div className="ccv-file__icon ccv-file__icon--doc">DOC</div>
          <div className="ccv-file__meta">
            <span className="ccv-file__name">Book of UX</span>
            <div className="ccv-file__bar"><div className="ccv-file__bar-fill" style={{ width: "45%" }} /></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ── Right: Discovery Progress ── */
function DiscoveryPanel() {
  const done = PROGRESS_ITEMS.filter((p) => p.status === "completed").length;
  const pct  = Math.round((done / PROGRESS_ITEMS.length) * 100);

  return (
    <aside className="ccv-discovery">
      <div className="ccv-panel-header">
        <span className="ccv-panel-title">Discovery Progress</span>
        <button className="ccv-info-btn" aria-label="Info">ⓘ</button>
      </div>

      <div className="ccv-prog-track">
        <div className="ccv-prog-track__fill" style={{ width: `${pct}%` }} />
      </div>

      <ul className="ccv-prog-list">
        {PROGRESS_ITEMS.map((item) => (
          <li key={item.label} className="ccv-prog-item">
            <div className="ccv-prog-item__left">
              <span className={`ccv-prog-dot
                ${item.status === "completed"   ? "ccv-prog-dot--done"     : ""}
                ${item.status === "in-progress" ? "ccv-prog-dot--progress" : ""}
              `} />
              <span className="ccv-prog-item__label">{item.label}</span>
            </div>
            <StatusBadge status={item.status} percent={item.percent} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Render a message's parts ── */
function MsgParts({ parts }) {
  return (
    <>
      {parts.map((p, i) => {
        if (p.t === "strong") return <strong key={i} style={{ whiteSpace: "pre-wrap" }}>{p.v}</strong>;
        if (p.t === "orange") return <strong key={i} className="ccv-msg__orange">{p.v}</strong>;
        return <span key={i} style={{ whiteSpace: "pre-wrap" }}>{p.v}</span>;
      })}
    </>
  );
}

/* ── Center: Chat ── */
function ChatPanel() {
  const [input,    setInput]    = useState("");
  const [thinking, setThinking] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  const send = () => {
    if (!input.trim()) return;
    setInput("");
    setThinking(true);
    setTimeout(() => setThinking(false), 2000);
  };

  return (
    <section className="ccv-chat" aria-label="Chat with Colaba AI">
      {/* Messages */}
      <div className="ccv-messages">
        {SEED_MESSAGES.map((msg) => (
          <div key={msg.id} className={`ccv-msg ccv-msg--${msg.role}`}>
            {msg.role === "ai" && <div className="ccv-msg__avatar" aria-hidden="true" />}

            <div className="ccv-msg__body">
              {msg.role === "ai" && (
                <div className={`ccv-bubble ${msg.highlight ? "ccv-bubble--hl" : ""}`}>
                  <p className="ccv-bubble__text"><MsgParts parts={msg.parts} /></p>
                </div>
              )}
              {msg.role === "user" && (
                <div className="ccv-bubble ccv-bubble--user">
                  <p className="ccv-bubble__text">{msg.text}</p>
                </div>
              )}
              {msg.chips && (
                <div className="ccv-chips">
                  {msg.chips.map((c) => (
                    <button key={c} className="ccv-chip" onClick={() => setInput(c)}>{c}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="ccv-thinking">
            <div className="ccv-thinking__dots"><span /><span /><span /></div>
            <p>AI is incorporating your feedback...</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions bar */}
      <div className="ccv-quick">
        <div className="ccv-quick__attach">
          <button className="ccv-attach-btn" aria-label="Attach file">＋</button>
          <div className="ccv-thumb">＋2</div>
        </div>
        <div className="ccv-quick__chips">
          {QUICK_ACTIONS.map((a) => (
            <button key={a} className="ccv-qa-chip" onClick={() => setInput(a)}>{a}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="ccv-input-row">
        <input
          type="text"
          className="ccv-input"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          aria-label="Message input"
        />
        <button
          className={`ccv-send ${input.trim() ? "ccv-send--active" : ""}`}
          onClick={send}
          disabled={!input.trim()}
          aria-label="Send"
        >
          🚀 Send
        </button>
      </div>
      <p className="ccv-disclaimer">Colaba can make mistakes. Consider check: Important Information</p>
    </section>
  );
}

/* ════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════ */
export default function StartYourBookTransitionToConversationChatView() {
  const navigate           = useNavigate();
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

      {/* Footer */}
      <footer className="ccv-footer">
        <div className="ccv-footer__inner">
          <button className="ccv-footer__save">📄 Save Draft</button>
          <span className="ccv-footer__autosave">Auto-saved at 10:45 AM</span>
          <button className="ccv-footer__outline" onClick={handleCreateOutline}>✨ Create Outline</button>
        </div>
      </footer>
    </div>
  );
}
