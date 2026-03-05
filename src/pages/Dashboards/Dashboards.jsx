/**
 * pages/Dashboards/Dashboards.jsx
 * Colaba.ai — Figma Page 2: "Dashboards" (node-id: 955:4291)
 */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Button     from "../../components/Button";
import BookCard   from "../../components/BookCard";
import {
  IMG_BOOK_HERO, IMG_PEN_SPARKLE, IMG_SETTINGS_ICO,
} from "../../assets/index";
import "./Dashboards.css";

/* ── Data ── */
const MY_BOOKS = [
  { id: 1, title: "My Life is Color...",    dot: true  },
  { id: 2, title: "Reflections on N...",    dot: false },
  { id: 3, title: "The Art of Mindfu...",   dot: true  },
  { id: 4, title: "Exploring New Cu...",    dot: false },
  { id: 5, title: "The Silence of Ha...",   dot: false },
  { id: 6, title: "A Culinary Advent...",   dot: false },
];

const RECENT_BOOKS = [
  { id: 1, title: "The Unwanted Ghost", words: "12k words",  badge: "In Progress" },
  { id: 2, title: "The Unwanted Ghost", words: "8.4k words", badge: "Draft"       },
  { id: 3, title: "The Unwanted Ghost", words: "5.1k words", badge: "In Progress" },
];

/* ── Sidebar extras: My Books list + Get Free Book CTA ── */
function BookListExtra() {
  return (
    <>
      <p className="sidebar-sub-label">My Books</p>
      {MY_BOOKS.map((b) => (
        <div className="sidebar-book-item" key={b.id} role="button" tabIndex={0}>
          <p className="sidebar-book-item__title">{b.title}</p>
          {b.dot && <span className="sidebar-book-item__dot" aria-hidden="true" />}
        </div>
      ))}
      <a href="#" className="db-sidebar-cta" aria-label="Get your free book">
        <img src={IMG_PEN_SPARKLE} alt="" aria-hidden="true" />
        <span>Get Free Book</span>
      </a>
    </>
  );
}

/* ── Sidebar bottom: Settings ── */
function SettingsLink() {
  return (
    <NavLink to="/settings" className="sidebar-nav-item sidebar-nav-item--settings" aria-label="Settings">
      <img src={IMG_SETTINGS_ICO} alt="" />
      <span className="sidebar-nav-item__label">Settings</span>
    </NavLink>
  );
}

/* ── Progress banner ── */
function ProgressBanner() {
  return (
    <div className="db-banner" aria-label="Writing progress">
      <img src={IMG_BOOK_HERO} alt="Book illustration" className="db-banner__img" />
      <div className="db-banner__body">
        <h2 className="db-banner__title">
          Write Your Book with <span className="brand-text">COLABA</span>
        </h2>
        <p className="db-banner__sub">
          You&apos;re making great progress on <strong>The Art of Becoming.</strong>{" "}
          You&apos;ve written <strong>1,240 words</strong> this week.
        </p>
        <div className="db-banner__actions">
          <Button variant="outline" size="sm" icon={IMG_PEN_SPARKLE} href="#">
            Continue Writing
          </Button>
          <Button variant="primary" size="sm" icon={IMG_PEN_SPARKLE} href="#">
            Start Your Book
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Recently Viewed section ── */
function RecentlyViewed() {
  const [tab, setTab] = useState("all");

  return (
    <section className="db-recent" aria-label="Recently viewed books">
      {/* Header row */}
      <div className="db-recent__header">
        <div className="db-recent__left">
          <h3 className="db-recent__title">Recently Viewed</h3>
          <div className="db-tabs" role="tablist">
            {["all", "filter"].map((t) => (
              <button key={t} role="tab" aria-selected={tab === t}
                className={`db-tab ${tab === t ? "db-tab--active" : "db-tab--inactive"}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="db-sort-group">
          {["Last Viewed", "Topic"].map((s) => (
            <button key={s} className="db-sort-btn">
              {s}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="db-books-grid">
        {RECENT_BOOKS.map((book, i) => (
          <BookCard key={book.id} index={i}
            title={book.title} words={book.words} badge={book.badge}
          />
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   PAGE — "Dashboards"
   ════════════════════════════════════════ */
export default function Dashboards() {
  return (
    <MainLayout
      sidebarExtra={<BookListExtra />}
      sidebarBottom={<SettingsLink />}
    >
      {/* Greeting row */}
      <div className="db-greeting-row">
        <div>
          <h1 className="db-greeting__title">
            Good Morning, <span className="db-greeting__name">Usama</span> 👋
          </h1>
          <p className="db-greeting__sub">
            Let&apos;s start by understanding your idea it only takes a few minutes.
          </p>
        </div>
        <Button variant="primary" size="md" icon={IMG_PEN_SPARKLE} href="#" aria-label="Start your book">
          Start Your Book
        </Button>
      </div>

      {/* Progress banner */}
      <ProgressBanner />

      {/* Recently Viewed */}
      <RecentlyViewed />
    </MainLayout>
  );
}
