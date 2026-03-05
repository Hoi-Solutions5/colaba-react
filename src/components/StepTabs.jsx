/**
 * src/components/StepTabs.jsx
 * Colaba.ai — Horizontal step-tab bar
 * Matches: "Choose Your Book & Share Your Story › Transition to Conversation › Outline Creation › Publishing"
 *
 * Props:
 *   steps : [{ label, path? }]   — array of step objects in order
 *   active : string              — label of currently active step
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./StepTabs.css";

export default function StepTabs({ steps = [], active }) {
  const navigate = useNavigate();

  return (
    <nav className="steptabs" aria-label="Workflow steps">
      <div className="steptabs__track">
        {steps.map((step, i) => {
          const isActive   = step.label === active;
          const isPast     = steps.findIndex((s) => s.label === active) > i;
          const isLast     = i === steps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <button
                className={`steptabs__step
                  ${isActive ? "steptabs__step--active"    : ""}
                  ${isPast   ? "steptabs__step--past"      : ""}
                  ${!isActive && !isPast ? "steptabs__step--future" : ""}
                `}
                onClick={() => step.path && navigate(step.path)}
                aria-current={isActive ? "step" : undefined}
                tabIndex={step.path ? 0 : -1}
              >
                {/* Step number indicator */}
                <span className={`steptabs__dot
                  ${isActive ? "steptabs__dot--active" : ""}
                  ${isPast   ? "steptabs__dot--past"   : ""}
                `}>
                  {isPast ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.2 5.8L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </span>

                {/* Label */}
                <span className="steptabs__label">{step.label}</span>
              </button>

              {/* Chevron separator */}
              {!isLast && (
                <svg className="steptabs__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
