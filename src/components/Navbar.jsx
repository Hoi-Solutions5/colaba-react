/**
 * src/components/Navbar.jsx
 * Colaba.ai — Modified to match Figma node 955:4211 exactly.
 * Changes: search bar, user profile text + role, dropdown arrow, click dropdown.
 * Existing structure/classes preserved.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  IMG_LOGO,
  IMG_AVATAR,
  IMG_HELP_ICON,
  IMG_NOTIF_ICON,
  IMG_NOTIF_DOT,
  IMG_SEARCH_ICON,
  IMG_ARROW_DOWN,
} from "../assets/index";
import "./Navbar.css";

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const profileRef = useRef(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    if (!dropOpen) return;
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropOpen]);

  return (
    <header className="cb-navbar">

      {/* ── Logo ────────────────────────────────
          Figma: w-178.666px h-38.286px left-60px top-25px */}
      <img src="/images/logo.png" alt="Colaba.ai" className="cb-navbar__logo" />

      {/* ── Right side ─────────────────────────
          Figma: gap-16px items-center */}
      <div className="cb-navbar__right">

        {/* Search bar
            Figma: bg-#3d3d3d rounded-32px h-42px w-351px px-18px py-13px
                   gap-11px  icon-16px
                   Red Hat Display Regular 12px white "Search" */}
        <div className="cb-navbar__search">
          <img src="/images/search.png" alt="" className="cb-navbar__search-ic" />
          <span className="cb-navbar__search-txt">Search</span>
        </div>

        {/* Vertical divider  Figma: rotated line, rgba(255,255,255,0.18) */}
        <div className="cb-navbar__divider" aria-hidden="true" />

        {/* Icon buttons  Figma: gap-12px  each bg-#3d3d3d rounded-32px size-32px */}
        <div className="cb-navbar__icons">
          <button className="cb-navbar__icon-btn" aria-label="Help">
            <img src={IMG_HELP_ICON} alt="" />
          </button>
          <button className="cb-navbar__icon-btn" aria-label="Notifications">
            <img src={IMG_NOTIF_ICON} alt="" />
            {/* Notification dot  Figma: size-4px ml-9.33px */}
            <span className="cb-navbar__notif-dot" aria-hidden="true" />
          </button>
        </div>

        {/* Vertical divider */}
        <div className="cb-navbar__divider" aria-hidden="true" />

        {/* Profile section — click opens dropdown
            Figma: gap-24px items-center (avatar+text block) + arrow */}
        <div
          className={`cb-navbar__profile${dropOpen ? " cb-navbar__profile--open" : ""}`}
          ref={profileRef}
          onClick={() => setDropOpen((o) => !o)}
          role="button"
          tabIndex={0}
          aria-label="User menu"
          aria-expanded={dropOpen}
          onKeyDown={(e) => e.key === "Enter" && setDropOpen((o) => !o)}
        >
          {/* Avatar + text block  Figma: gap-12px */}
          <div className="cb-navbar__user">
            {/* Avatar  Figma: size-48px circular */}
            <img src={IMG_AVATAR} alt="User" className="cb-navbar__avatar" />
            {/* Name + role  Figma: gap-6px */}
            <div className="cb-navbar__user-info">
              {/* Open Sans SemiBold 14px white */}
              <span className="cb-navbar__user-name">waleed aamir</span>
              {/* Open Sans Regular 11px white text-right */}
              <span className="cb-navbar__user-role">Lead UIUX Designer</span>
            </div>
          </div>

          {/* Arrow  Figma: size-24px vuesax/linear/arrow-down */}
          <img
            src={IMG_ARROW_DOWN}
            alt=""
            className={`cb-navbar__arrow${dropOpen ? " cb-navbar__arrow--up" : ""}`}
          />

          {/* Dropdown menu */}
          <div className={`cb-navbar__dropdown${dropOpen ? " cb-navbar__dropdown--show" : ""}`}>
            <button className="cb-navbar__drop-item" onClick={(e) => e.stopPropagation()}>
              {/* Profile icon */}
              <svg className="cb-navbar__drop-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Profile
            </button>
            <div className="cb-navbar__drop-sep" />
            <button className="cb-navbar__drop-item cb-navbar__drop-item--danger" onClick={(e) => e.stopPropagation()}>
              {/* Logout icon */}
              <svg className="cb-navbar__drop-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Logout
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
