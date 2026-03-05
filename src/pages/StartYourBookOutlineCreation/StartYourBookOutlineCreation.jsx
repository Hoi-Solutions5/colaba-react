/**
 * src/pages/StartYourBookOutlineCreation/StartYourBookOutlineCreation.jsx
 * Colaba.ai — "Start Your Book - Outline Creation"
 * Figma node-id: 955:4989
 *
 * Drag & drop: @dnd-kit/core + @dnd-kit/sortable + @dnd-kit/utilities
 * Install cmd: npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext, closestCenter, KeyboardSensor,
  PointerSensor, useSensor, useSensors, DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext,
  sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MainLayout         from "../../layout/MainLayout";
import StepTabs           from "../../components/StepTabs";
import { PATHS }          from "../../utils/constants";
import { WORKFLOW_STEPS } from "../../routes/routes";
import "./StartYourBookOutlineCreation.css";

/* ─────────────────────────────────────────
   SEED DATA
   ───────────────────────────────────────── */
const SEED = [
  {
    id: "ch-1",
    title: "The Early Years",
    body: "Introduction to the family farm and early childhood memories. Setting the scene for the rural upbringing and the simplicity of life before the move.",
    tags: ["#Family", "#Nature", "#Travel"],
  },
  {
    id: "ch-2",
    title: "The Great Shift",
    body: "Moving to the city and adapting to a new lifestyle. Exploring the challenges of urban life and how it contrasts with the rural past.",
    tags: [],
  },
  {
    id: "ch-3",
    title: "Concrete Jungle",
    body: "Looking back on the experiences that shaped identity. Understanding the importance of roots and how they influence future decisions.",
    tags: ["#Identity", "#Memories", "#Family"],
  },
];

/* ─────────────────────────────────────────
   DRAG HANDLE
   ───────────────────────────────────────── */
function DragHandle({ listeners, attributes }) {
  return (
    <button
      type="button"
      className="oc-drag-handle"
      aria-label="Drag to reorder"
      {...(listeners || {})}
      {...(attributes || {})}
    >
      <i /><i /><i /><i /><i /><i />
    </button>
  );
}

/* ─────────────────────────────────────────
   CHAPTER CARD — view / edit inner content
   ───────────────────────────────────────── */
function CardBody({ chapter, isEditing, onEdit, onUpdate }) {
  const [dTitle, setDTitle] = useState(chapter.title);
  const [dBody,  setDBody]  = useState(chapter.body);

  useEffect(() => {
    if (!isEditing) { setDTitle(chapter.title); setDBody(chapter.body); }
  }, [isEditing, chapter.title, chapter.body]);

  return (
    <div className="oc-card__body-wrap">
      {isEditing ? (
        <div className="oc-card__edit">
          <input
            className="oc-input-title"
            value={dTitle}
            onChange={(e) => setDTitle(e.target.value)}
          />
          <textarea
            className="oc-input-desc"
            value={dBody}
            rows={3}
            onChange={(e) => setDBody(e.target.value)}
          />
        </div>
      ) : (
        <div className="oc-card__view">
          <h3 className="oc-card__title">{chapter.title}</h3>
          <p  className="oc-card__desc">{chapter.body}</p>
          {chapter.tags.length > 0 && (
            <div className="oc-card__tags">
              {chapter.tags.map((t) => <span key={t} className="oc-tag">{t}</span>)}
            </div>
          )}
        </div>
      )}

      <div className="oc-card__action">
        {isEditing
          ? <button className="oc-btn-update" onClick={() => onUpdate(chapter.id, { title: dTitle, body: dBody })}>Update Content</button>
          : <button className="oc-btn-edit"   onClick={() => onEdit(chapter.id)}>Edit Content</button>
        }
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SORTABLE CARD WRAPPER
   ───────────────────────────────────────── */
function SortableCard({ chapter, isEditing, onEdit, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: chapter.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform:  CSS.Transform.toString(transform),
        transition: isDragging ? "none" : (transition || "transform 200ms ease"),
      }}
      className={`oc-card${isDragging ? " oc-card--ghost" : ""}${isEditing ? " oc-card--editing" : ""}`}
    >
      <DragHandle listeners={listeners} attributes={attributes} />
      <CardBody chapter={chapter} isEditing={isEditing} onEdit={onEdit} onUpdate={onUpdate} />
    </div>
  );
}

/* ─────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────── */
function Footer({ onWrite }) {
  const navigate = useNavigate();
  return (
    <div className="oc-footer">
      <button className="oc-footer__save">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M4.5 1.5v4.5h7V1.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M3 16V9.5h10V16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
        Save Draft
      </button>
      <button className="oc-footer__change" onClick={() => navigate(PATHS.CHAT_VIEW)}>
        I Want to Change Something
      </button>
      <span className="oc-footer__auto">Auto-saved at 10:45 AM</span>
      <span className="oc-footer__looks">This Looks Great</span>
      <button className="oc-footer__write" onClick={onWrite}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.2l1.4 3 3.4.5-2.4 2.3.5 3.4L7 8.9l-3 1.5.5-3.4L2.2 4.7l3.4-.5z" fill="white"/>
        </svg>
        Let's Write!
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
   ───────────────────────────────────────── */
export default function StartYourBookOutlineCreation() {
  const navigate = useNavigate();
  const [chapters,  setChapters]  = useState(SEED);
  const [editingId, setEditingId] = useState("ch-2");
  const [activeId,  setActiveId]  = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor,  { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart  = ({ active }) => setActiveId(active.id);
  const handleDragCancel = () => setActiveId(null);
  const handleDragEnd    = ({ active, over }) => {
    setActiveId(null);
    if (active.id !== over?.id) {
      setChapters((prev) => arrayMove(
        prev,
        prev.findIndex((c) => c.id === active.id),
        prev.findIndex((c) => c.id === over.id)
      ));
    }
  };

  const handleUpdate = (id, updates) => {
    setChapters((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c));
    setEditingId(null);
  };

  const handleAdd = () => {
    const id = `ch-${Date.now()}`;
    setChapters((prev) => [...prev, { id, title: "New Chapter", body: "Describe this chapter...", tags: [] }]);
    setEditingId(id);
  };

  const activeChapter = chapters.find((c) => c.id === activeId);

  return (
    <MainLayout footer={<Footer onWrite={() => navigate('/chapter-writing')} />} noPadding>
      <StepTabs steps={WORKFLOW_STEPS} active="Outline Creation" />

      <div className="oc-scroll">
        <div className="oc-body">

          {/* Book header */}
          <header className="oc-header">
            <h1 className="oc-header__title">The Art of Becoming</h1>
            <p  className="oc-header__desc">
              A journey through the early years in the countryside, moving to the city, and finding success
              against all odds. This memoir captures the essence of resilience and hope.
            </p>
            <div className="oc-header__meta">
              <span className="oc-meta-pill">MEMOIR</span>
              <span className="oc-meta-pill">0{chapters.length} CHAPTERS</span>
            </div>
          </header>

          {/* DnD list */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext items={chapters.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="oc-list">
                {chapters.map((ch) => (
                  <SortableCard
                    key={ch.id}
                    chapter={ch}
                    isEditing={editingId === ch.id}
                    onEdit={setEditingId}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Floating drag preview */}
            <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.25,1,0.5,1)" }}>
              {activeChapter && (
                <div className="oc-card oc-card--overlay">
                  <DragHandle />
                  <CardBody chapter={activeChapter} isEditing={false} onEdit={() => {}} onUpdate={() => {}} />
                </div>
              )}
            </DragOverlay>
          </DndContext>

          {/* Add chapter */}
          <div className="oc-add-row">
            <button className="oc-btn-add" onClick={handleAdd}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.2l1.4 3 3.4.5-2.4 2.3.5 3.4L7 8.9l-3 1.5.5-3.4L2.2 4.7l3.4-.5z" fill="#febd43"/>
              </svg>
              Add New Chapter
            </button>
            <span className="oc-add-hint">Reading material, Case Study, and Quiz</span>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
