/**
 * src/routes/AppRouter.jsx
 * Colaba.ai — Centralised <Routes> declaration
 *
 * All routes live here. To add a page:
 *   1. Import the component
 *   2. Add a <Route> entry
 *   3. Add an entry in routes.js for StepTabs / nav awareness
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "../utils/constants";

/* ── All page imports (only import files that actually exist) ── */
import StartYourBookChooseYourBookShareYourStory
  from "../pages/StartYourBookChooseYourBookShareYourStory";
import StartYourBookTransitionToConversationChatStart
  from "../pages/StartYourBookTransitionToConversationChatStart";
import StartYourBookTransitionToConversationChatView
  from "../pages/StartYourBookTransitionToConversationChatView";
import Dashboards
  from "../pages/Dashboards/Dashboards";
import DashboardsEmptyState
  from "../pages/DashboardsEmptyState/DashboardsEmptyState";
import StartYourBookOutlineCreation
  from "../pages/StartYourBookOutlineCreation/StartYourBookOutlineCreation";
import ChapterWriting
  from "../pages/chapter-writing/ChapterWriting";
import BookReview
  from "../pages/book-review/BookReview";

/**
 * Placeholder shown for pages not yet built.
 * When a page is ready: import it above and replace <ComingSoon> with its component.
 */
function ComingSoon({ title }) {
  return (
    <div className="coming-soon">
      <h2 className="coming-soon__title">{title}</h2>
      <p className="coming-soon__sub">This page is coming soon.</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route index element={<Navigate to={PATHS.DASHBOARDS} replace />} />

      {/* ── Dashboard pages ── */}
      {/* Figma: "Dashboards" (node-id: 955:4291) */}
      <Route path={PATHS.DASHBOARDS}      element={<Dashboards />} />

      {/* Figma: "Dashboards - Empty State" (node-id: 955:4211) */}
      <Route path={PATHS.DASHBOARDS_EMPTY} element={<DashboardsEmptyState />} />

      {/* ── Start Your Book workflow ── */}
      {/* Figma: "Start Your Book - Choose Your Book & Share Your Story" (955:4588) */}
      <Route path={PATHS.START_YOUR_BOOK}  element={<StartYourBookChooseYourBookShareYourStory />} />

      {/* Figma: "Start Your Book - Transition to Conversation - Chat Start" (955:4729) */}
      <Route path={PATHS.CHAT_START}       element={<StartYourBookTransitionToConversationChatStart />} />

      {/* Figma: "Start Your Book - Transition to Conversation - Chat View" (955:5743) */}
      <Route path={PATHS.CHAT_VIEW}        element={<StartYourBookTransitionToConversationChatView />} />

      {/* ── Future pages (not yet built — swap ComingSoon for real component when ready) ── */}
      {/* Figma: "Start Your Book - Outline Creation" (node-id: 955:4989) */}
      <Route path={PATHS. OUTLINE_CREATION} element={<StartYourBookOutlineCreation />} />
      <Route path={PATHS.PUBLISHING}       element={<ComingSoon title="Publishing" />} />

      {/* Figma: "Start Your Book - Chapter Writing" (node-id: 1123:484) */}
      <Route path="/chapter-writing" element={<ChapterWriting />} />

      {/* Figma: "Start Your Book - Book Review" (node-id: 955:5157) */}
      <Route path="/book-review" element={<BookReview />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={PATHS.DASHBOARDS} replace />} />
    </Routes>
  );
}
