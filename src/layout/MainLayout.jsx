/**
 * src/layout/MainLayout.jsx
 * Colaba.ai — Unified layout supporting BOTH modes:
 *
 *   MODE A — Dashboard (with sidebar):
 *     <MainLayout sidebarExtra={...} sidebarBottom={...}>
 *
 *   MODE B — Workflow pages (full-width + optional footer):
 *     <MainLayout footer={...} noPadding>
 *
 * UPDATED: merged colaba-ai sidebar-mode + colaba-new footer-mode into one component.
 */
import React from "react";
import Navbar   from "../components/Navbar";
import Sidebar  from "../components/Sidebar";
import "./MainLayout.css";

export default function MainLayout({
  children,
  /* Mode B props */
  footer    = null,
  noPadding = false,
  /* Mode A props (dashboard / sidebar mode) */
  sidebarExtra  = null,
  sidebarBottom = null,
}) {
  const hasSidebar = sidebarExtra !== null || sidebarBottom !== null;

  if (hasSidebar) {
    /* ── MODE A: Dashboard layout with sidebar ── */
    return (
      <div className="layout-root">
        <Navbar />
        <div className="layout-body">
          <Sidebar extraItems={sidebarExtra} bottomSlot={sidebarBottom} />
          <main className="layout-main" role="main">
            {children}
          </main>
        </div>
      </div>
    );
  }

  /* ── MODE B: Workflow page layout (full-width, optional footer) ── */
  return (
    <div className="ml-root">
      <Navbar />
      <div className={`ml-content ${noPadding ? "ml-content--no-pad" : ""}`}>
        {children}
      </div>
      {footer && <div className="ml-footer">{footer}</div>}
    </div>
  );
}
