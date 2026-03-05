/**
 * src/routes/routes.js
 * Colaba.ai — Exact Figma page name → path mapping
 *
 * UPDATED: added all workflow steps + status flags for StepTabs awareness.
 *
 * status:
 *   "live"    → page is built and routable
 *   "pending" → page not yet built (renders ComingSoon placeholder)
 */

import { PATHS } from "../utils/constants";

export const ROUTES = [
  /* ── Workflow Step 1 ── */
  {
    figmaName: "Start Your Book - Choose Your Book & Share Your Story",
    label:     "Choose Your Book & Share Your Story",
    path:      PATHS.START_YOUR_BOOK,
    stepLabel: "Choose Your Book & Share Your Story",
    status:    "live",
    nodeId:    "955:4588",
  },

  /* ── Workflow Step 2a ── */
  {
    figmaName: "Start Your Book - Transition to Conversation - Chat Start",
    label:     "Chat Start",
    path:      PATHS.CHAT_START,
    stepLabel: "Transition to Conversation",
    status:    "live",
    nodeId:    "955:4729",
  },

  /* ── Workflow Step 2b ── */
  {
    figmaName: "Start Your Book - Transition to Conversation - Chat View",
    label:     "Chat View",
    path:      PATHS.CHAT_VIEW,
    stepLabel: "Transition to Conversation",
    status:    "live",
    nodeId:    "955:5743",
  },

  /* ── Workflow Step 3 ── */
  {
    figmaName: "Outline Creation",
    label:     "Outline Creation",
    path:      PATHS.OUTLINE_CREATION,
    stepLabel: "Outline Creation",
    status:    "pending",
    nodeId:    null,
  },

  /* ── Workflow Step 4 ── */
  {
    figmaName: "Publishing",
    label:     "Publishing",
    path:      PATHS.PUBLISHING,
    stepLabel: "Publishing",
    status:    "pending",
    nodeId:    null,
  },
];

/**
 * Helper: get the ordered step list used by StepTabs across all workflow pages.
 * Deduplicates by stepLabel so "Chat Start" and "Chat View" both show as
 * "Transition to Conversation" in the tabs.
 */
export const WORKFLOW_STEPS = [
  { label: "Choose Your Book & Share Your Story", path: PATHS.START_YOUR_BOOK },
  { label: "Transition to Conversation",          path: PATHS.CHAT_START       },
  { label: "Outline Creation",                    path: PATHS.OUTLINE_CREATION },
  { label: "Publishing",                          path: null                   },
];

/**
 * DASHBOARD_NAV — routes shown in the Dashboard sidebar nav.
 * Separated so the Sidebar component only shows dashboard-relevant links.
 */
export const DASHBOARD_NAV = [
  {
    label: "Dashboard",
    path:  PATHS.DASHBOARDS,
  },
  {
    label: "Empty State",
    path:  PATHS.DASHBOARDS_EMPTY,
  },
];
