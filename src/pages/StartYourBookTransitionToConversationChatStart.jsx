/**
 * src/pages/StartYourBookTransitionToConversationChatStart.jsx
 * Colaba.ai — "Start Your Book - Transition to Conversation - Chat Start"
 * node-id: 955:4729
 */
import React, { useState } from "react";
import { useNavigate }    from "react-router-dom";
import MainLayout         from "../layout/MainLayout";
import StepTabs           from "../components/StepTabs";
import { PATHS }          from "../utils/constants";
import { WORKFLOW_STEPS } from "../routes/routes";
import "./StartYourBookTransitionToConversationChatStart.css";

const ACTIVE = "Transition to Conversation";

const START_OPTIONS = [
  { id: "memoir", image: "/images/img1.png", label: "I want to write my life story or memoir" },
  { id: "selfhelp", image: "/images/img2.png", label: "I have a self-help book idea to share"   },
  { id: "nonfic",   image: "/images/img3.png", label: "I'm exploring a non-fiction topic"       },
  { id: "start",    image: "/images/img4.png", label: "I just want to start writing freely"     },
];

function FooterBar({ onExplore }) {
  return (
    <div className="ccs-footer">
      <span className="ccs-footer__hint">Ready to generate your first structured outline for free</span>
      <button className="ccs-btn-explore" onClick={onExplore} >  Let's Explore Ideas</button>
    </div>
  );
}

export default function StartYourBookTransitionToConversationChatStart() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <MainLayout footer={<FooterBar onExplore={() => navigate(PATHS.CHAT_VIEW)} />} noPadding>
      <StepTabs steps={WORKFLOW_STEPS} active={ACTIVE} />

      <div className="ccs-scroll-area">
        <div className="ccs-body">

          {/* AI greeting */}
          <div className="ccs-message-row">
            <div className="ccs-avatar" aria-hidden="true" />
            <div className="ccs-ai-bubble">
              <p className="ccs-ai-bubble__greeting">Hello Alex!</p>
              <p className="ccs-ai-bubble__body">
                I'm Colaba! your personal AI writing guide. I've helped thousands of authors turn
                whispers of ideas into published works.
              </p>
              <p className="ccs-ai-bubble__question">What masterpiece are we crafting today?</p>
            </div>
          </div>

          {/* Option selector */}
          <div className="ccs-options">
            <p className="ccs-options__label">Pick a starting point that feels right for you:</p>
            <div className="ccs-options__grid">
              {START_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`ccs-option-btn ${selected === opt.id ? "ccs-option-btn--active" : ""}`}
                  onClick={() => setSelected(opt.id)}
                  aria-pressed={selected === opt.id}
                >
                  <img src={opt.image} alt="" className="ccs-option-btn__img" />
                  {/* <span className="ccs-option-btn__emoji">{opt.emoji}</span> */}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
