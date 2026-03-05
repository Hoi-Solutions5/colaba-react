/**
 * ChapterWriting.jsx — Colaba.ai
 * Pixel-perfect to Figma node 1123:483
 * Bootstrap col-8 / col-4 grid
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../../components/Navbar";
import { PATHS } from "../../utils/constants";
import DATA from "./chapter-writing.json";
import "./chapter-writing.css";

const MODULES = { toolbar: { container: "#cw-toolbar" } };
const FORMATS  = ["bold","italic","underline","header","list","bullet","blockquote","color","align"];

async function saveDraft(p)   { return new Promise(r=>setTimeout(()=>r({savedAt:new Date().toISOString()}),400)); }
async function sendMessage(p) { return new Promise(r=>setTimeout(()=>r({reply:"Great detail! That really grounds the reader in the scene."}),900)); }

/* ─── Figma toolbar icon URLs ─── */
const IC_UNDO  = "https://www.figma.com/api/mcp/asset/33573b47-9d86-4a77-9d3c-27aae7cdf896";
const IC_REDO  = "https://www.figma.com/api/mcp/asset/57f0ac44-7507-472c-8b97-fa55b6a64d06";
const IC_BOLD  = "https://www.figma.com/api/mcp/asset/fd6ad593-c218-475d-9692-680b3f082740";
const IC_ITAL  = "https://www.figma.com/api/mcp/asset/34ae5b9c-371d-4ee0-a85a-5af6e4cb27d9";
const IC_UL    = "https://www.figma.com/api/mcp/asset/9e382c7c-93a0-4548-9963-3b26b436ec00";
const IC_AA    = "https://www.figma.com/api/mcp/asset/d775248e-7d87-4798-8562-8f55135e400d";
const IC_H1    = "https://www.figma.com/api/mcp/asset/6300e2d2-22e7-4061-8034-ac9d1bff0fbe";
const IC_H2    = "https://www.figma.com/api/mcp/asset/9d5b285a-371e-4900-846a-88f870410bc4";
const IC_H3    = "https://www.figma.com/api/mcp/asset/af1e24d0-af45-45ea-af2f-a7e898458985";
const IC_ARR   = "https://www.figma.com/api/mcp/asset/f68c95c9-e3d2-45bc-84f2-ad196a1e1bfd";
const IC_ADD   = "https://www.figma.com/api/mcp/asset/daa8bec3-d34f-47e7-bd8c-6b201ed93cfb";
const IC_MIC   = "https://www.figma.com/api/mcp/asset/ffab983c-cdd5-402a-989b-37548f92d3e8";
const IC_SEND  = "https://www.figma.com/api/mcp/asset/9de40d4b-bc21-478a-b657-15a31bcde435";
const IC_DOTS  = "https://www.figma.com/api/mcp/asset/57a8c1a1-0b56-4b5a-9b90-9a99b4895270";
const IC_DRAFT = "https://www.figma.com/api/mcp/asset/60b09565-48fb-428f-89de-5e08cc93e57d";
const IC_BRAIN = "https://www.figma.com/api/mcp/asset/6414ecf3-d8fa-4bdc-8b57-fc8f5a575401";

/* ─── Toolbar ─── */
function Toolbar() {
  return (
    <div id="cw-toolbar" className="cw-tb">
      <span className="cw-tb__g">
        <button className="ql-custom cw-tb__icon" title="Undo" onMouseDown={e=>e.preventDefault()}><img src={IC_UNDO} alt="undo" width="20" height="20"/></button>
        <button className="ql-custom cw-tb__icon" title="Redo" onMouseDown={e=>e.preventDefault()}><img src={IC_REDO} alt="redo" width="20" height="20"/></button>
      </span>
      <span className="cw-tb__g">
        <button className="ql-bold      cw-tb__icon" title="Bold">     <img src={IC_BOLD} alt="B" width="20" height="20"/></button>
        <button className="ql-italic    cw-tb__icon" title="Italic">   <img src={IC_ITAL} alt="I" width="20" height="20"/></button>
        <button className="ql-underline cw-tb__icon" title="Underline"><img src={IC_UL}   alt="U" width="20" height="20"/></button>
        <button className="ql-custom    cw-tb__icon" title="Font size" onMouseDown={e=>e.preventDefault()}><img src={IC_AA} alt="Aa" width="20" height="20"/></button>
      </span>
      <span className="cw-tb__g">
        <button className="ql-header cw-tb__icon" value="1" title="H1"><img src={IC_H1} alt="H1" width="20" height="20"/></button>
        <button className="ql-header cw-tb__icon" value="2" title="H2"><img src={IC_H2} alt="H2" width="20" height="20"/></button>
        <button className="ql-header cw-tb__icon" value="3" title="H3"><img src={IC_H3} alt="H3" width="20" height="20"/></button>
      </span>
      <span className="cw-tb__g cw-tb__g--select">
        <select className="ql-header cw-tb__select">
          <option value="">Normal Text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
        <img className="cw-tb__arr" src={IC_ARR} alt="" width="17" height="17"/>
      </span>
    </div>
  );
}

/* ─── Chat bubble ─── */
function Bubble({ msg }) {
  return (
    <div className={`cw-bub cw-bub--${msg.role}`}>
      <p className="cw-bub__txt">{msg.text}</p>
    </div>
  );
}

/* ─── Page ─── */
export default function ChapterWriting() {
  const navigate = useNavigate();
  const [content, setContent] = useState(DATA.content);
  const [saving,  setSaving]  = useState(false);
  const [savedAt, setSavedAt] = useState("10:45 AM");
  const [msgs,    setMsgs]    = useState(DATA.chat.messages);
  const [input,   setInput]   = useState("");
  const [sending, setSending] = useState(false);
  const feedEnd = useRef(null);

  useEffect(()=>{ feedEnd.current?.scrollIntoView({behavior:"smooth"}); },[msgs,sending]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const r = await saveDraft({chapterNumber:DATA.chapterNumber,title:DATA.title,content});
      setSavedAt(new Date(r.savedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));
    } finally { setSaving(false); }
  };

  const doSend = async () => {
    const t = input.trim();
    if (!t||sending) return;
    setMsgs(p=>[...p,{id:`u${Date.now()}`,role:"user",text:t}]);
    setInput(""); setSending(true);
    try {
      const r = await sendMessage({message:t,chapterNumber:DATA.chapterNumber});
      setMsgs(p=>[...p,{id:`a${Date.now()}`,role:"ai",text:r.reply}]);
    } finally { setSending(false); }
  };

  return (
    <div className="cw-page">
      <Navbar />

      {/* ── White shell ── */}
      <div className="cw-shell">

        {/* Bootstrap row: col-8 left | col-4 right */}
        <div className="container-fluid p-0 h-100">
          <div className="row g-0 h-100">

            {/* ════ LEFT col-8 ════ */}
            <div className="col-8 d-flex flex-column cw-left-col">

              {/* ── Top bar: breadcrumb + title/progress ── */}
              <div className="cw-topbar">

                {/* Breadcrumb */}
                <div className="cw-bc">
                  <Link to={PATHS.OUTLINE_CREATION} className="cw-bc__link">Outline creation</Link>
                  <span className="cw-bc__chevron">
                    <img src="https://www.figma.com/api/mcp/asset/4573ab83-1d32-4165-b37c-352b61e8566e" alt="" width="12" height="12"/>
                  </span>
                  <span className="cw-bc__cur">Chapter {DATA.chapterNumber}</span>
                </div>

                {/* Title-left + Progress-right (same row) */}
                <div className="cw-topbar__row">

                  {/* Left: title + tags */}
                  <div className="cw-topbar__meta">
                    <p className="cw-ch-title">{DATA.title}</p>
                    <div className="cw-tags">
                      {DATA.tags.map(t=><span key={t} className="cw-tag">{t}</span>)}
                    </div>
                  </div>

                  {/* Right: progress */}
                  <div className="cw-prog">
                    <div className="cw-prog__labels">
                      <span className="cw-prog__lbl">
                        Progress <strong>({DATA.progress}%)</strong>
                      </span>
                      <span className="cw-prog__cnt">
                        <strong>{DATA.chapterNumber}</strong> of {DATA.totalChapters} chapters complete
                      </span>
                    </div>
                    <div className="cw-prog__track">
                      <div className="cw-prog__fill" style={{width:`${DATA.progress}%`}}/>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Scrollable editor area ── */}
              <div className="cw-editor-scroll">
                <div className="cw-paper-wrap">
                  {/* A4 paper card */}
                  <div className="cw-paper">
                    <Toolbar />
                    <div className="cw-paper__body">
                      <p className="cw-paper__ch-label">CHAPTER {DATA.chapterNumber}</p>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={MODULES}
                        formats={FORMATS}
                        className="cw-quill"
                        placeholder="Begin writing your chapter here..."
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>{/* /col-8 */}

            {/* ════ RIGHT col-4 ════ */}
            <div className="col-4 d-flex flex-column cw-right-col">

              {/* Chat header */}
              <div className="cw-chat-hdr">
                <p className="cw-chat-hdr__name">{DATA.chat.agentName}</p>
                <p className="cw-chat-hdr__sub">{DATA.chat.agentSubtitle}</p>
                <div className="cw-chat-hdr__rule"/>
              </div>

              {/* Messages feed */}
              <div className="cw-chat-feed">
                {msgs.map(m=><Bubble key={m.id} msg={m}/>)}
                {sending && (
                  <div className="cw-thinking">
                    <img src={IC_DOTS} alt="" width="38" height="18"/>
                    <span className="cw-thinking__txt">AI is incorporating your feedback...</span>
                  </div>
                )}
                <div ref={feedEnd}/>
              </div>

              {/* Input */}
              <div className="cw-input-outer">
                <div className="cw-input-inner">
                  <button className="cw-input-add" type="button" aria-label="Add">
                    <img src={IC_ADD} alt="" width="22" height="22"/>
                  </button>
                  <input
                    className="cw-input-field"
                    placeholder="Ask anything...."
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),doSend())}
                  />
                  <div className="cw-input-actions">
                    <button className="cw-input-mic" type="button" aria-label="Voice">
                      <img src={IC_MIC} alt="" width="16" height="16"/>
                    </button>
                    <button
                      className="cw-send-btn"
                      onClick={doSend}
                      disabled={sending}
                      type="button"
                    >
                      <img src={IC_SEND} alt="" width="13" height="13"/>
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <p className="cw-disclaimer">Colaba can make mistakes. Check important info.</p>

            </div>{/* /col-4 */}

          </div>
        </div>
      </div>{/* /cw-shell */}

      {/* ── Footer ── */}
      <footer className="cw-footer">
        <div className="cw-foot__left">
          <button className="cw-foot__save" onClick={handleSave} disabled={saving}>
            <img src={IC_DRAFT} alt="" width="16" height="16"/>
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button className="cw-foot__change" onClick={()=>navigate(PATHS.OUTLINE_CREATION)}>
            I Want to Change Something
          </button>
        </div>
        <span className="cw-foot__auto">Auto-saved at {savedAt}</span>
        <div className="cw-foot__right">
          <span className="cw-foot__looks">This Looks Great</span>
          <button className="cw-foot__next" onClick={()=>navigate(PATHS.PUBLISHING)}>
            <img src={IC_BRAIN} alt="" width="16" height="16"/>
            Next Chapter
          </button>
        </div>
      </footer>

    </div>
  );
}
