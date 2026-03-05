/**
 * components/BookCard.jsx
 * Colaba.ai — Book card with warm cover placeholder, title, meta
 *
 * Props:
 *   title  : string
 *   words  : string  (e.g. "12k words")
 *   badge  : string  (e.g. "In Progress")
 *   index  : number  (0-based, used for gradient variant)
 *   imgSrc : string  (optional — uses placeholder if omitted)
 */

import React from "react";
import "./BookCard.css";

const COVER_GRADIENTS = [
  ["#f5e2b8", "#e8a040"],
  ["#f0d5b0", "#d9904e"],
  ["#ecdbc8", "#c97838"],
];

function CoverPlaceholder({ index }) {
  const [bg, acc] = COVER_GRADIENTS[index % COVER_GRADIENTS.length];
  return (
    <div
      className="book-card__cover-placeholder"
    
    >
      <img src="/images/book3.png" alt="" />
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="8" width="40" height="48" rx="4" fill="white" fillOpacity="0.32" />
        <rect x="16" y="14" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
        <rect x="16" y="21" width="22" height="2" rx="1" fill="white" fillOpacity="0.45" />
        <rect x="16" y="27" width="26" height="2" rx="1" fill="white" fillOpacity="0.45" />
        <rect x="16" y="33" width="18" height="2" rx="1" fill="white" fillOpacity="0.35" />
        <line x1="20" y1="8" x2="20" y2="56" stroke="white" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function BookCard({ title, words, badge, index = 0, imgSrc, progress = 33 }) {
  return (
    <article className="book-card" tabIndex={0} aria-label={`Book: ${title}`}>
      {imgSrc
        ? <img src={imgSrc} alt={title} className="book-card__cover-img" />
        : <CoverPlaceholder index={index} />
      }

      {/* ── Body — Figma node 955:4354
           bg #1f1f1f  padding 13px 10.63px  gap 4.619px ── */}
      <div className="book-card__body">

        {/* Top row: title+chapters left · timestamp right */}
        <div className="book-card__meta">

          {/* Left column — Figma: w-158px gap-5.542px */}
          <div className="book-card__meta-left">
            {/* Title — Figma: Lato Bold 16.627px #ffffff whitespace-nowrap */}
            <p className="book-card__title">{title}</p>
            {/* Chapters text — Figma: Lato Regular 9.237px rgba(255,255,255,0.7) */}
            {words && <span className="book-card__words">{words}</span>}
          </div>

          {/* Right column — Figma: w-56.347px items-end justify-end */}
          {badge && (
            <div className="book-card__meta-right">
              {/* Timestamp — Figma: Lato Regular 9.237px rgba(255,255,255,0.7) text-right */}
              <span className="book-card__badge">{badge}</span>
            </div>
          )}
        </div>

        {/* Progress bar — Figma: track rgba(217,217,217,0.2) h-2.864px rounded-52.652px
                           fill  #febd43                      h-3px   rounded-52.652px */}
        <div className="book-card__progress-track">
          <div
            className="book-card__progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

      </div>
    </article>
  );
}
