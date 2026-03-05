/**
 * components/Sidebar.jsx
 * Colaba.ai — Router-aware sidebar (accepts optional extraItems + bottomSlot)
 */

import React from "react";
import { NavLink } from "react-router-dom";
import { DASHBOARD_NAV as ROUTES } from "../routes/routes";
import { IMG_DASHBOARD_ICO, IMG_SETTINGS_ICO } from "../assets/index";
import "./Sidebar.css";

export default function Sidebar({ extraItems = null, bottomSlot = null }) {
  return (
    <aside className="sidebar-root" aria-label="Side navigation">
      <div className="sidebar-top">
        <p className="sidebar-section-label">Main</p>

        {/* Router NavLinks — active class auto-applied */}
        {ROUTES.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? "sidebar-nav-item--active" : ""}`
            }
            aria-label={r.label}
          >
            <img src={IMG_DASHBOARD_ICO} alt="" />
            <span className="sidebar-nav-item__label">{r.label}</span>
          </NavLink>
        ))}

        {/* Optional extra content passed by each page (e.g. book list) */}
        {extraItems}
      </div>

      {/* Bottom — settings or custom slot */}
      <div className="sidebar-bottom">
        {bottomSlot ?? (
          <NavLink to="/settings" className="sidebar-nav-item sidebar-nav-item--settings" aria-label="Settings">
            <img src={IMG_SETTINGS_ICO} alt="" />
            <span className="sidebar-nav-item__label">Settings</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
}
