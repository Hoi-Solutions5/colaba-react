/**
 * pages/DashboardsEmptyState/DashboardsEmptyState.jsx
 * Colaba.ai — Figma Page 1: "Dashboards - Empty State" (node-id: 955:4211)
 */

import React from "react";
import MainLayout from "../../layout/MainLayout";
import Button     from "../../components/Button";
import { IMG_BOOK_HERO, IMG_PEN_SPARKLE, IMG_SETTINGS_ICO } from "../../assets/index";
import { NavLink } from "react-router-dom";
import "./DashboardsEmptyState.css";

/* Sidebar bottom override — settings pill */
function SettingsLink() {
  return (
    <NavLink to="/settings" className="sidebar-nav-item sidebar-nav-item--settings" aria-label="Settings">
      <img src={IMG_SETTINGS_ICO} alt="" />
      <span className="sidebar-nav-item__label">Settings</span>
    </NavLink>
  );
}

/* ── Main card ── */
function EmptyCard() {
  return (
    <article className="es-card" aria-label="Get started with Colaba AI">
      {/* Hero illustration */}
      <img src={IMG_BOOK_HERO} alt="Book writing illustration" className="es-card__img" />

      <div className="es-card__content">
        {/* Headline */}
        <h1 className="es-card__headline">
          Write Your Book with{" "}
          <span className="brand-text">COLABA</span>
        </h1>

        {/* Subtitle */}
        <p className="es-card__subtitle">
          I&apos;m here to help you write the book you&apos;ve been thinking about.
          Let&apos;s start by understanding your idea{" "}
          <strong>it only takes a few minutes.</strong>
        </p>

        {/* CTA */}
        <div className="es-cta-block">
          <Button
            variant="primary"
            size="sm"
            icon={IMG_PEN_SPARKLE}
            href="#"
            aria-label="Start writing your book"
          >
            Start Your Book
          </Button>
          <p className="es-cta-hint">You&apos;ll get a complete book outline for free.</p>
        </div>
      </div>
    </article>
  );
}

/* ════════════════════════════════════════
   PAGE — "Dashboards - Empty State"
   ════════════════════════════════════════ */
export default function DashboardsEmptyState() {
  return (
    <MainLayout sidebarBottom={<SettingsLink />}>
      <div className="es-page-center">
        <EmptyCard />
      </div>
    </MainLayout>
  );
}
