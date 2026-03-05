/**
 * src/components/Navbar.jsx
 * Colaba.ai — Shared dark top navigation bar
 */
import React from "react";
import { IMG_LOGO, IMG_AVATAR, IMG_HELP_ICON, IMG_NOTIF_ICON, IMG_NOTIF_DOT } from "../assets/index";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="cb-navbar">
      <img src={IMG_LOGO} alt="Colaba.ai" className="cb-navbar__logo" />
      <div className="cb-navbar__right">
        <button className="cb-navbar__icon-btn" aria-label="Help">
          <img src={IMG_HELP_ICON} alt="" />
        </button>
        <button className="cb-navbar__icon-btn" aria-label="Notifications">
          <img src={IMG_NOTIF_ICON} alt="" />
          <span className="cb-navbar__notif-dot" aria-hidden="true" />
        </button>
        <div className="cb-navbar__divider" aria-hidden="true" />
        <img src={IMG_AVATAR} alt="User" className="cb-navbar__avatar" />
      </div>
    </header>
  );
}
