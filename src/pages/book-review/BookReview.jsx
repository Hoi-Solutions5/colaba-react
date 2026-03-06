/**
 * BookReview.jsx — Colaba.ai
 * Pixel-perfect rebuild to Figma node 955:5157
 * Bootstrap: container-fluid / row g-0 / col-auto / col  ONLY
 * All styling: book-review.css  (px units, exact Figma values)
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../../components/Navbar";
import { PATHS } from "../../utils/constants";
import DATA from "./book-review.json";
import "./book-review.css";

/* ─── Fresh Figma asset URLs (node 955:5157) ─── */
const IC_SEARCH  = "https://www.figma.com/api/mcp/asset/93351fb9-a25a-46f8-87eb-4c5736d09b4a";
const IC_STARS   = "https://www.figma.com/api/mcp/asset/e1ec3e63-e808-4068-8898-6799f6611b73";
const IC_ARROW   = "https://www.figma.com/api/mcp/asset/89fe73a6-ad40-4410-8076-56555b559877";
const IC_UNDO    = "https://www.figma.com/api/mcp/asset/041ca264-67fd-447a-8f46-f7af50457a3e";
const IC_REDO    = "https://www.figma.com/api/mcp/asset/d69a759f-a8ce-464f-b69e-3e4743a3abcd";
const IC_BOLD    = "https://www.figma.com/api/mcp/asset/4b127225-c366-4110-a9af-1ef8e1bd4675";
const IC_ITALIC  = "https://www.figma.com/api/mcp/asset/db90dfc7-d7f7-45ea-be43-69c46c91ad6c";
const IC_UNDER   = "https://www.figma.com/api/mcp/asset/ab888b82-ae59-4a3f-90a4-d3c2c6804e5d";
const IC_AA      = "https://www.figma.com/api/mcp/asset/da2f8068-96c2-4a63-80b8-dfa1ade394b9";
const IC_H1      = "https://www.figma.com/api/mcp/asset/d37a61c0-9ec0-42f0-88ec-45ea0bc2f570";
const IC_H2      = "https://www.figma.com/api/mcp/asset/89d92366-febc-470e-ad95-aa07b7e8a972";
const IC_H3      = "https://www.figma.com/api/mcp/asset/577fa6cf-94a9-43fd-a408-7c026ae3012e";
const IC_SVGARR  = "https://www.figma.com/api/mcp/asset/214c7f13-7a89-4247-993d-b98f2b507ffb";
const IC_DOTS    = "https://www.figma.com/api/mcp/asset/9a2cb326-4bf1-4588-8163-2047a41c31a9";
const IC_ADD     = "https://www.figma.com/api/mcp/asset/3819e4c9-c23f-425b-a5e1-d080cc093416";
const IC_MIC     = "https://www.figma.com/api/mcp/asset/5b63f90e-ac65-4270-b753-72bf1940ea3b";
const IC_SEND    = "https://www.figma.com/api/mcp/asset/2c8edae0-6921-4aee-b6d0-ec1e85f550b0";
const IC_DRAFT   = "https://www.figma.com/api/mcp/asset/990547e0-0590-4053-a966-59ef8e0f6cf6";
const IC_BRAIN   = "https://www.figma.com/api/mcp/asset/d7f7b485-a115-4d1e-a50e-ce4e4d6d950c";
const IC_LINE8   = "https://www.figma.com/api/mcp/asset/bda07075-6d99-416a-9485-2c0bf1a5ea71";

/* ─── Quill config ─── */
const MODULES = { toolbar: { container: "#br-toolbar" } };
const FORMATS  = ["bold","italic","underline","header","list","bullet","blockquote","align"];

/* ─── API stubs (ready for real integration) ─── */
async function saveDraft()    { return new Promise(r => setTimeout(() => r({ savedAt: new Date().toISOString() }), 400)); }
async function sendMessage(t) { return new Promise(r => setTimeout(() => r({ reply: "That's a compelling angle! The emotional disconnect between external success and inner fulfilment is a very powerful theme to explore." }), 900)); }

/* ─────────────────────────────────────
   TOOLBAR COMPONENT
   Figma: bg-rgba(255,208,121,0.1) border-[1.362px #dfdfdf]
          rounded-[16px] h-[67px] p-[11px]
          shadow-[0px_5.447px_13.618px_0px_rgba(0,0,0,0.05)]
          icons 21.253px gap-[21.253px] p-[12px]
   ───────────────────────────────────── */
function Toolbar() {
  return (
    <div id="br-toolbar" className="br-tb">
      <div className="br-tb__row">
        <button className="ql-custom br-tb__icon" onMouseDown={e => e.preventDefault()} title="Undo">
          <img src={IC_UNDO} alt="undo" width="21" height="21" />
        </button>
        <button className="ql-custom br-tb__icon" onMouseDown={e => e.preventDefault()} title="Redo">
          <img src={IC_REDO} alt="redo" width="21" height="21" />
        </button>
        <button className="ql-bold      br-tb__icon" title="Bold">     <img src={IC_BOLD}   alt="B" width="21" height="21" /></button>
        <button className="ql-italic    br-tb__icon" title="Italic">   <img src={IC_ITALIC} alt="I" width="21" height="21" /></button>
        <button className="ql-underline br-tb__icon" title="Underline"><img src={IC_UNDER}  alt="U" width="21" height="21" /></button>
        <button className="ql-custom    br-tb__icon" title="Font size" onMouseDown={e => e.preventDefault()}>
          <img src={IC_AA} alt="Aa" width="21" height="21" />
        </button>
        <button className="ql-header br-tb__icon" value="1" title="H1"><img src={IC_H1} alt="H1" width="21" height="21" /></button>
        <button className="ql-header br-tb__icon" value="2" title="H2"><img src={IC_H2} alt="H2" width="21" height="21" /></button>
        <button className="ql-header br-tb__icon" value="3" title="H3"><img src={IC_H3} alt="H3" width="21" height="21" /></button>
        {/* "Normal Text" dropdown — Figma: Inter Medium 14px #747474 + 18px arrow */}
        <span className="br-tb__sel-wrap">
          <select className="ql-header br-tb__sel">
            <option value="">Normal Text</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
          <img src={IC_SVGARR} className="br-tb__sel-arr" alt="" width="18" height="18" />
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   CHAT BUBBLE
   ───────────────────────────────────── */
function Bubble({ msg }) {
  return (
    <div className={`br-bub br-bub--${msg.role}`}>
      <p className="br-bub__txt">{msg.text}</p>
    </div>
  );
}

/* ─────────────────────────────────────
   CHAPTER LIST ITEM
   ───────────────────────────────────── */
function ChItem({ ch, active, onClick, showDivider }) {
  return (
    <>
      <div
        className={`br-ch${active ? " br-ch--on" : ""}`}
        onClick={onClick}
      >
        <p className="br-ch__lbl">{ch.label}</p>
        <p className="br-ch__title">{ch.title}</p>
        <p className="br-ch__excerpt">{ch.excerpt}</p>
      </div>
      {showDivider && !active && (
        <div className="br-ch__div">
          <img src={IC_LINE8} alt="" />
        </div>
      )}
    </>
  );
}

/* ═════════════════════════════════════
   PAGE COMPONENT
   ═════════════════════════════════════ */
export default function BookReview() {
  const navigate = useNavigate();
  const [activeChap, setActiveChap] = useState(DATA.activeChapter);
  const [search,     setSearch]     = useState("");
  const [content,    setContent]    = useState(DATA.content);
  const [saving,     setSaving]     = useState(false);
  const [savedAt,    setSavedAt]    = useState("10:45 AM");
  const [msgs,       setMsgs]       = useState(DATA.chat.messages);
  const [chatInput,  setChatInput]  = useState("");
  const [sending,    setSending]    = useState(false);
  const feedEnd = useRef(null);

  useEffect(() => { feedEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, sending]);

  const handleSave = async () => {
    setSaving(true);
    const r = await saveDraft();
    setSavedAt(new Date(r.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setSaving(false);
  };

  const doSend = async () => {
    const t = chatInput.trim();
    if (!t || sending) return;
    setMsgs(p => [...p, { id: `u${Date.now()}`, role: "user", text: t }]);
    setChatInput("");
    setSending(true);
    const r = await sendMessage(t);
    setMsgs(p => [...p, { id: `a${Date.now()}`, role: "ai", text: r.reply }]);
    setSending(false);
  };

  const filtered = DATA.chapters.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="br-page">
      {/* ── Fixed dark navbar (89px) ── */}
      <Navbar />

      {/* ══ THREE-COLUMN SHELL ══
          height: calc(100vh - 89px - 91px)
          Bootstrap: container-fluid > row g-0 h-100
      */}
      <div className="br-shell">
        <div className="container-fluid p-0 h-100">
          <div className="row g-0 h-100">

            {/* ════════════════════════════════
                LEFT SIDEBAR
                Figma: w-311px top-89px h-937px
                       bg-white border-l border-r #dfdfdf
                       rounded-tl-32px
                       shadow 4px 4px 10px rgba(0,0,0,0.05)
                ════════════════════════════════ */}
            <div className="col-auto br-sidebar p-35">

              {/* Book title + chapter count */}
              <div className="br-sb-head">
                <p className="br-sb-head__title">The Art of Becoming</p>
                <p className="br-sb-head__count">
                  <strong className="br-sb-head__count-bold">(04 </strong>
                  <span className="br-sb-head__count-reg">Chapters</span>
                  <strong className="br-sb-head__count-bold">)</strong>
                </p>
              </div>

              {/* Rule  Figma: w-263px h-0px border #dfdfdf */}
              <div className="br-sb-rule" />

              {/* Search box
                  Figma: border #dfdfdf rounded-8px h-42px px-12px py-8px
                         icon 15.824px  Lato Regular 11.868px #181815 */}
              <div className="br-sb-search">
                <img src={IC_SEARCH} alt="" className="br-sb-search__ic" />
                <input
                  className="br-sb-search__inp"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Chapter list
                  Figma: gap-11.518px h-677px */}
              <div className="br-ch-list">
                {filtered.map((ch, i) => (
                  <ChItem
                    key={ch.id}
                    ch={ch}
                    active={ch.id === activeChap}
                    onClick={() => setActiveChap(ch.id)}
                    showDivider={i < filtered.length - 1}
                  />
                ))}
              </div>

              {/* Add New Chapter
                  Figma: bg-rgba(255,208,121,0.1) border-#ffd079 rounded-29px
                         h-48px px-26.876px py-30.715px gap-9.599px
                         Lato SemiBold 14px #1f1f1f */}
              <button className="br-add-btn" type="button">
                <img src={IC_STARS} alt="" width="24" height="24" />
                Add New Chapter
              </button>

            </div>{/* /sidebar */}

            {/* ════════════════════════════════
                MAIN EDITOR COLUMN
                ════════════════════════════════ */}
            <div className="col d-flex flex-column br-main">

              {/* ── TOPBAR
                  Figma: bg-white border-b border-t #dfdfdf
                         pt-18px pb-50px px-20px
                         inner gap-17px w-882px ── */}
              <div className="br-topbar">

                {/* Breadcrumb
                    Figma: gap-8px items-center
                           Lato Regular 14px rgba(116,116,115,0.7)
                           last item SemiBold #1f1f1f */}
                <div className="br-bc">
                  <span className="br-bc__dim">Dashboard</span>
                  <span className="br-bc__chev">
                    <img src={IC_ARROW} alt="" width="12" height="12" />
                  </span>
                  <span className="br-bc__dim">All Books</span>
                  <span className="br-bc__chev">
                    <img src={IC_ARROW} alt="" width="12" height="12" />
                  </span>
                  <span className="br-bc__cur">[Book Name]</span>
                </div>

                {/* Toolbar card */}
                <Toolbar />
              </div>

              {/* ── SCROLLABLE PAPER AREA
                  Figma: bg-#fafafa rounded-tl-30px rounded-tr-30px
                         overflow-y-auto ── */}
              <div className="br-paper-scroll">
                <div className="br-paper-bg">

                  {/* A4 card
                      Figma: bg-white border-l border-r border-t #dfdfdf
                             rounded-30px shadow-4px-4px-10px-rgba(0,0,0,0.05)
                             left-20px top-21px w-882px h-1248px */}
                  <div className="br-paper">
                    {/* Inner: left-56px top-56px w-768px gap-26.331px pb-140px */}
                    <div className="br-paper__inner">

                      {/* CHAPTER label
                          Figma: Inter Bold 13.166px #94a3b8
                                 tracking-1.3166px uppercase h-17.554px */}
                      <p className="br-paper__ch-lbl">CHAPTER {activeChap}</p>

                      {/* H1 title
                          Figma: Lora SemiBold 52.663px #0f172a
                                 leading-52.663px */}
                      <h1 className="br-paper__h1">{DATA.reviewTitle}</h1>

                      {/* Body content with drop-cap, paragraphs, blockquote
                          ReactQuill editor */}
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={MODULES}
                        formats={FORMATS}
                        className="br-quill"
                      />

                    </div>
                  </div>
                </div>
              </div>

            </div>{/* /main */}

            {/* ════════════════════════════════
                RIGHT CHAT PANEL
                Figma: w-495px top-90px h-937px
                       bg-white border-l border-r border-t #dfdfdf
                       rounded-tr-32px
                       shadow 4px 4px 10px rgba(0,0,0,0.05)
                ════════════════════════════════ */}
            <div className="col-auto d-flex flex-column br-chat">

              {/* Chat header
                  Figma: left-23px top-23px w-447px gap-18px
                         "Colaba AI" Open Sans SemiBold 18px #181815
                         subtitle Open Sans Regular 11px #747473 */}
              <div className="br-chat-hdr">
                <p className="br-chat-hdr__name">Colaba AI</p>
                <p className="br-chat-hdr__sub">AI Assistant is helping you bridge knowledge gaps</p>
                <div className="br-chat-hdr__rule" />
              </div>

              {/* Messages feed  — flex:1 scroll */}
              <div className="br-chat-feed">
                {msgs.map(m => <Bubble key={m.id} msg={m} />)}
                {sending && (
                  <div className="br-thinking">
                    {/* Figma: w-38px h-18px dots image */}
                    <img src={IC_DOTS} alt="" width="38" height="18" />
                    <span className="br-thinking__txt">AI is incorporating your feedback...</span>
                  </div>
                )}
                <div ref={feedEnd} />
              </div>

              {/* Bottom section: thinking + input + disclaimer
                  Figma: top-806px inside 937px panel */}
              <div className="br-chat-btm">

                {/* Input pill
                    Figma outer: bg-#f8f8f8 border-#e4e4e4 rounded-12px
                                 shadow-0px-4px-10px-rgba(0,0,0,0.05)
                                 h-45px p-3px w-447px
                    Figma inner: bg-white rounded-11px h-38px p-5px */}
                <div className="br-inp-outer">
                  <div className="br-inp-inner">
                    {/* + button  Figma: bg-rgba(255,208,121,0.2) rounded-7px
                                        p-3.111px icon-21.778px */}
                    <div className="br-inp-add">
                      <img src={IC_ADD} alt="" width="22" height="22" />
                    </div>
                    <input
                      className="br-inp-field"
                      placeholder="Ask anything...."
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), doSend())}
                    />
                    <div className="br-inp-actions">
                      {/* Mic icon  Figma: 15.889px */}
                      <img src={IC_MIC} alt="" className="br-inp-mic" width="16" height="16" />
                      {/* Send btn  Figma: bg-#febd43 rounded-7px px-8px py-4px
                                          gap-4px icon-12.654px Lato Regular 12px #404040 */}
                      <button
                        className="br-send"
                        onClick={doSend}
                        disabled={sending}
                        type="button"
                      >
                        <img src={IC_SEND} alt="" width="13" height="13" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* Disclaimer  Figma: Lato Regular 10px rgba(64,64,64,0.5) */}
                <p className="br-disclaimer">Colaba can make mistakes. Check important info.</p>
              </div>

            </div>{/* /chat */}

          </div>{/* /row */}
        </div>{/* /container-fluid */}
      </div>{/* /br-shell */}

      {/* ════════════════════════════════
          FOOTER  (fixed bottom)
          Figma: bg-white border-#dfdfdf h-91px
                 shadow-4px-4px-10px-rgba(0,0,0,0.05)
                 px-60px inner w-1608px justify-between
          ════════════════════════════════ */}
      <footer className="br-footer">
        <div className="br-foot__left">
          {/* Save Draft  Figma: bg-white border-#ccc rounded-55px
                                 w-123px px-16px py-13px gap-10px
                                 icon-16px Lato SemiBold 14px #181815 */}
          <button className="br-foot__save" onClick={handleSave} disabled={saving} type="button">
            <img src={IC_DRAFT} alt="" width="16" height="16" />
            {saving ? "Saving…" : "Save Draft"}
          </button>
          {/* Lato Regular 14px rgba(28,12,19,0.5) */}
          <button className="br-foot__change" type="button">
            I Want to Change Something
          </button>
        </div>

        {/* Auto-saved center  Lato Regular 14px rgba(28,12,19,0.5) */}
        <span className="br-foot__auto">Auto-saved at {savedAt}</span>

        <div className="br-foot__right">
          {/* "This Looks Great"  Lato Regular 14px rgba(28,12,19,0.5) */}
          <span className="br-foot__looks">This Looks Great</span>
          {/* Publish Book  Figma: gradient border-#febd43 rounded-24px
                                   shadow-0px-4px-8.1px-rgba(254,189,67,0.4)
                                   p-12px w-186.5px gap-12px icon-16px
                                   Lato SemiBold 14px white */}
          <button className="br-foot__publish" onClick={() => navigate(PATHS.PUBLISHING)} type="button">
            <img src={IC_BRAIN} alt="" width="16" height="16" />
            Publish Book
          </button>
        </div>
      </footer>

    </div>
  );
}
