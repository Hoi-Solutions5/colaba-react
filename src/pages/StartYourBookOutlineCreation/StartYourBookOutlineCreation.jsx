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
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MainLayout from "../../layout/MainLayout";
import StepTabs from "../../components/StepTabs";
import { PATHS } from "../../utils/constants";
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
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </button>
  );
}

/* ─────────────────────────────────────────
   CHAPTER CARD — view / edit inner content
   ───────────────────────────────────────── */
function CardBody({ chapter, isEditing, onEdit, onUpdate }) {
  const [dTitle, setDTitle] = useState(chapter.title);
  const [dBody, setDBody] = useState(chapter.body);

  useEffect(() => {
    if (!isEditing) {
      setDTitle(chapter.title);
      setDBody(chapter.body);
    }
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
          <p className="oc-card__desc">{chapter.body}</p>
          {chapter.tags.length > 0 && (
            <div className="oc-card__tags">
              {chapter.tags.map((t) => (
                <span key={t} className="oc-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="oc-card__action">
        {isEditing ? (
          <button
            className="oc-btn-update"
            onClick={() => onUpdate(chapter.id, { title: dTitle, body: dBody })}
          >
            Update Content
          </button>
        ) : (
          <button className="oc-btn-edit" onClick={() => onEdit(chapter.id)}>
            Edit Content
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SORTABLE CARD WRAPPER
   ───────────────────────────────────────── */
function SortableCard({ chapter, isEditing, onEdit, onUpdate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? "none" : transition || "transform 200ms ease",
      }}
      className={`oc-card${isDragging ? " oc-card--ghost" : ""}${isEditing ? " oc-card--editing" : ""}`}
    >
      <DragHandle listeners={listeners} attributes={attributes} />
      <CardBody
        chapter={chapter}
        isEditing={isEditing}
        onEdit={onEdit}
        onUpdate={onUpdate}
      />
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
          <rect
            x="1.5"
            y="1.5"
            width="13"
            height="13"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M4.5 1.5v4.5h7V1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M3 16V9.5h10V16"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
        Save Draft
      </button>
      <button
        className="oc-footer__change"
        onClick={() => navigate(PATHS.CHAT_VIEW)}
      >
        I Want to Change Something
      </button>
      <span className="oc-footer__auto">Auto-saved at 10:45 AM</span>
      <span className="oc-footer__looks">This Looks Great</span>
      <button className="oc-footer__write" onClick={onWrite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_955_5154)">
            <path
              d="M6.46193 1.60001C7.08913 1.60001 7.64593 1.89761 8.00033 2.36001V2.79681C8.00033 3.03681 8.07233 3.26161 8.20833 3.45361C8.2638 3.53201 8.3278 3.60268 8.40033 3.66561V12.0216C8.40099 12.4128 8.54692 12.7899 8.80981 13.0796C9.0727 13.3693 9.43383 13.5511 9.82314 13.5897C10.2125 13.6282 10.6022 13.5208 10.9168 13.2883C11.2315 13.0558 11.4485 12.7147 11.5259 12.3312L11.6083 11.9216C11.6238 11.8442 11.6619 11.7732 11.7177 11.7174C11.7735 11.6616 11.8446 11.6235 11.9219 11.608L12.1547 11.5608C12.6108 11.4693 13.0138 11.2047 13.2791 10.8226C13.5444 10.4405 13.6515 9.97054 13.5779 9.51121C13.8359 9.61711 14.1231 9.62789 14.3883 9.54161C14.3963 9.62588 14.4003 9.71121 14.4003 9.79761C14.4001 10.3932 14.1954 10.9707 13.8204 11.4335C13.4455 11.8963 12.923 12.2163 12.3403 12.34L12.3107 12.488C12.2186 12.9492 11.9917 13.3727 11.6589 13.705C11.3261 14.0373 10.9022 14.2634 10.4409 14.3549C9.97957 14.4463 9.50149 14.399 9.06708 14.2187C8.63268 14.0385 8.26145 13.7336 8.00033 13.3424C7.73926 13.7336 7.3681 14.0385 6.93375 14.2188C6.4994 14.3991 6.02136 14.4465 5.56005 14.3552C5.09874 14.2638 4.67487 14.0377 4.342 13.7055C4.00913 13.3734 3.78222 12.9499 3.68993 12.4888L3.66033 12.34C3.1322 12.2283 2.65197 11.9549 2.28635 11.5577C1.92073 11.1606 1.68788 10.6594 1.62015 10.1239C1.55241 9.58835 1.65316 9.045 1.90838 8.56933C2.1636 8.09366 2.56064 7.70929 3.04433 7.46961C2.84135 7.28238 2.67933 7.05515 2.5685 6.80222C2.45766 6.5493 2.4004 6.27616 2.40033 6.00001V5.84161C2.40033 4.81281 3.12673 3.92641 4.13553 3.72481L4.46033 3.66081L4.56033 3.15841C4.64835 2.7189 4.88591 2.32346 5.2326 2.03934C5.57928 1.75522 6.01369 1.59997 6.46193 1.60001ZM6.46193 2.40001C5.91953 2.40001 5.45153 2.78401 5.34513 3.31601L5.19313 4.07841C5.17757 4.1559 5.1394 4.22703 5.08344 4.28285C5.02749 4.33866 4.95625 4.37664 4.87873 4.39201L4.29233 4.50961C3.98454 4.57148 3.70763 4.73792 3.50859 4.98071C3.30955 5.22349 3.20064 5.52766 3.20033 5.84161V6.00001C3.20033 6.31827 3.32676 6.6235 3.5518 6.84854C3.77684 7.07358 4.08207 7.20001 4.40033 7.20001C4.50642 7.20001 4.60816 7.24215 4.68317 7.31717C4.75819 7.39218 4.80033 7.49392 4.80033 7.60001C4.80033 7.7061 4.75819 7.80784 4.68317 7.88285C4.60816 7.95787 4.50642 8.00001 4.40033 8.00001H4.19793C3.75263 8.00149 3.32371 8.16813 2.99421 8.46767C2.6647 8.76721 2.45804 9.17834 2.41424 9.62148C2.37043 10.0646 2.49259 10.5083 2.75707 10.8665C3.02155 11.2248 3.40954 11.4722 3.84593 11.5608L4.07793 11.608C4.15545 11.6234 4.22669 11.6614 4.28264 11.7172C4.3386 11.773 4.37677 11.8441 4.39233 11.9216L4.47473 12.3312C4.55213 12.7147 4.76919 13.0558 5.08381 13.2883C5.39843 13.5208 5.7882 13.6282 6.17752 13.5897C6.56683 13.5511 6.92796 13.3693 7.19085 13.0796C7.45374 12.7899 7.59967 12.4128 7.60033 12.0216V3.53841C7.60033 2.90961 7.09073 2.40001 6.46193 2.40001ZM13.9875 4.80001C14.0376 4.79971 14.0864 4.81505 14.1273 4.84388C14.1682 4.87271 14.199 4.91359 14.2155 4.96081L14.4155 5.57361C14.4777 5.75956 14.5823 5.92849 14.721 6.06706C14.8597 6.20563 15.0287 6.31003 15.2147 6.37201L15.8267 6.57041L15.8387 6.57361C15.8739 6.58615 15.9058 6.60667 15.9318 6.63357C15.9577 6.66046 15.9771 6.693 15.9884 6.72863C15.9998 6.76426 16.0027 6.80203 15.997 6.83898C15.9912 6.87593 15.9771 6.91105 15.9555 6.94161C15.9267 6.98238 15.8859 7.01314 15.8387 7.02961L15.2267 7.22801C15.0407 7.28999 14.8717 7.39439 14.733 7.53296C14.5943 7.67153 14.4897 7.84046 14.4275 8.02641L14.2283 8.63921C14.2118 8.68647 14.1809 8.72741 14.1401 8.75637C14.0992 8.78534 14.0504 8.80089 14.0003 8.80089C13.9503 8.80089 13.9014 8.78534 13.8606 8.75637C13.8197 8.72741 13.7889 8.68647 13.7723 8.63921L13.5723 8.02641C13.5107 7.83996 13.4064 7.67044 13.2678 7.5313C13.1292 7.39215 12.9601 7.28722 12.7739 7.22481L12.1619 7.02641C12.1267 7.01387 12.0949 6.99335 12.0689 6.96645C12.0429 6.93956 12.0235 6.90703 12.0122 6.87139C12.0009 6.83576 11.998 6.79799 12.0037 6.76104C12.0094 6.7241 12.0236 6.68897 12.0451 6.65841C12.074 6.61764 12.1148 6.58688 12.1619 6.57041L12.7739 6.37201C12.9577 6.30845 13.1244 6.20335 13.2609 6.06487C13.3974 5.92639 13.5002 5.75828 13.5611 5.57361L13.7603 4.96001C13.7769 4.91307 13.8077 4.87245 13.8484 4.84378C13.8891 4.81512 13.9377 4.79982 13.9875 4.80001ZM11.5827 1.04667e-05C11.653 -0.000543694 11.7216 0.0209198 11.779 0.0613847C11.8364 0.10185 11.8797 0.159282 11.9027 0.22561L12.1811 1.08321C12.2676 1.34367 12.4137 1.5803 12.6079 1.77421C12.8021 1.96813 13.0389 2.11394 13.2995 2.20001L14.1571 2.47921L14.1747 2.48321C14.2402 2.507 14.2967 2.55035 14.3367 2.60739C14.3766 2.66442 14.3981 2.73237 14.3981 2.80201C14.3981 2.87165 14.3766 2.9396 14.3367 2.99664C14.2967 3.05367 14.2402 3.09702 14.1747 3.12081L13.3163 3.40001C13.056 3.48664 12.8195 3.63264 12.6254 3.82648C12.4313 4.02031 12.2849 4.25665 12.1979 4.51681L11.9203 5.37441C11.9029 5.42369 11.8742 5.46826 11.8366 5.50461C11.799 5.54095 11.7535 5.5681 11.7037 5.58391C11.6539 5.59972 11.601 5.60377 11.5494 5.59574C11.4977 5.5877 11.4486 5.56781 11.4059 5.53761L11.3899 5.52561C11.3406 5.48585 11.3033 5.43325 11.2819 5.37361L11.0035 4.51761C10.9166 4.25663 10.7703 4.0194 10.5761 3.82463C10.3819 3.62985 10.1451 3.48285 9.88433 3.39521L9.02673 3.11681C8.96128 3.09302 8.90474 3.04967 8.86478 2.99264C8.82482 2.9356 8.80339 2.86765 8.80339 2.79801C8.80339 2.72837 8.82482 2.66042 8.86478 2.60339C8.90474 2.54635 8.96128 2.503 9.02673 2.47921L9.88433 2.20001C10.1415 2.11117 10.3747 1.96418 10.5658 1.77047C10.7568 1.57677 10.9006 1.34158 10.9859 1.08321L11.2643 0.22561C11.2874 0.159282 11.3307 0.10185 11.3881 0.0613847C11.4455 0.0209198 11.5141 -0.000543694 11.5843 1.04667e-05"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_955_5154">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
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
  const [chapters, setChapters] = useState(SEED);
  const [editingId, setEditingId] = useState("ch-2");
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragCancel = () => setActiveId(null);
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (active.id !== over?.id) {
      setChapters((prev) =>
        arrayMove(
          prev,
          prev.findIndex((c) => c.id === active.id),
          prev.findIndex((c) => c.id === over.id),
        ),
      );
    }
  };

  const handleUpdate = (id, updates) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
    setEditingId(null);
  };

  const handleAdd = () => {
    const id = `ch-${Date.now()}`;
    setChapters((prev) => [
      ...prev,
      { id, title: "New Chapter", body: "Describe this chapter...", tags: [] },
    ]);
    setEditingId(id);
  };

  const activeChapter = chapters.find((c) => c.id === activeId);

  return (
    <MainLayout
      footer={<Footer onWrite={() => navigate("/chapter-writing")} />}
      noPadding
    >
      <StepTabs steps={WORKFLOW_STEPS} active="Outline Creation" />

      <div className="oc-scroll">
        <div className="oc-body">
          {/* Book header */}
          <header className="oc-header">
            <h1 className="oc-header__title">The Art of Becoming</h1>
            <p className="oc-header__desc">
              A journey through the early years in the countryside, moving to
              the city, and finding success against all odds. This memoir
              captures the essence of resilience and hope.
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
            <SortableContext
              items={chapters.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
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
            <DragOverlay
              dropAnimation={{
                duration: 180,
                easing: "cubic-bezier(0.25,1,0.5,1)",
              }}
            >
              {activeChapter && (
                <div className="oc-card oc-card--overlay">
                  <DragHandle />
                  <CardBody
                    chapter={activeChapter}
                    isEditing={false}
                    onEdit={() => {}}
                    onUpdate={() => {}}
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>

          {/* Add chapter */}
          <div className="oc-add-row">
            <button className="oc-btn-add" onClick={handleAdd}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.7379 16.1299C21.7429 16.3486 21.6762 16.5628 21.5479 16.7399C21.4212 16.9205 21.2384 17.0541 21.0279 17.1199L19.3179 17.6899C18.7912 17.8648 18.312 18.1592 17.9179 18.5499C17.5242 18.9417 17.2294 19.4216 17.0579 19.9499L16.4579 21.6499C16.3954 21.854 16.2692 22.0327 16.0979 22.1599C15.915 22.2841 15.6989 22.3503 15.4779 22.3499C15.256 22.3594 15.0373 22.2948 14.8563 22.1662C14.6752 22.0377 14.5421 21.8525 14.4779 21.6399L13.9079 19.9299C13.7364 19.4016 13.4416 18.9217 13.0479 18.5299C12.6505 18.141 12.1726 17.844 11.6479 17.6599L9.93787 17.0999C9.73543 17.029 9.55816 16.9003 9.42787 16.7299C9.29658 16.5494 9.22333 16.3331 9.21787 16.1099C9.20839 15.8881 9.27302 15.6694 9.40158 15.4883C9.53013 15.3072 9.71529 15.1741 9.92787 15.1099L11.6479 14.5399C12.1813 14.3675 12.6661 14.071 13.0625 13.6746C13.4589 13.2782 13.7555 12.7933 13.9279 12.2599L14.4979 10.5699C14.5562 10.362 14.6802 10.1785 14.8514 10.0469C15.0227 9.91531 15.2319 9.8427 15.4479 9.83992C15.6629 9.83992 15.8739 9.89892 16.0579 10.0099C16.2399 10.1349 16.3799 10.3129 16.4579 10.5199L17.0379 12.2599C17.2102 12.7933 17.5068 13.2782 17.9032 13.6746C18.2996 14.071 18.7845 14.3675 19.3179 14.5399L21.0179 15.1399C21.2247 15.2077 21.4038 15.3411 21.5279 15.5199C21.6633 15.6945 21.7372 15.909 21.7379 16.1299ZM11.7389 9.76992C11.7373 9.96595 11.6782 10.1572 11.5689 10.3199C11.4507 10.4809 11.287 10.6028 11.0989 10.6699L9.83887 11.0899C9.48587 11.2119 9.16587 11.4099 8.89887 11.6699C8.63787 11.9361 8.4397 12.2573 8.31887 12.6099L7.88887 13.8499C7.8279 14.0412 7.7047 14.2067 7.53887 14.3199C7.37447 14.4347 7.17936 14.4974 6.97887 14.4999C6.77389 14.4965 6.5749 14.4302 6.40887 14.3099C6.25159 14.1903 6.13328 14.0267 6.06887 13.8399L5.65887 12.5899C5.53857 12.2399 5.34023 11.9219 5.07887 11.6599C4.82277 11.3912 4.50284 11.1917 4.14887 11.0799L2.89887 10.6599C2.70491 10.5989 2.5363 10.4759 2.41887 10.3099C2.33927 10.1853 2.28832 10.0445 2.26969 9.89774C2.25105 9.75101 2.2652 9.60197 2.31111 9.46136C2.35703 9.32076 2.43356 9.19209 2.53519 9.08463C2.63683 8.97716 2.76104 8.89359 2.89887 8.83992L4.14887 8.42992C4.50257 8.30642 4.82384 8.1047 5.08875 7.83979C5.35366 7.57488 5.55537 7.25361 5.67887 6.89992L6.08887 5.66992C6.14781 5.48559 6.25897 5.32232 6.40887 5.19992C6.56816 5.0799 6.7597 5.01025 6.95887 4.99992C7.16067 4.9945 7.35938 5.05027 7.52887 5.15992C7.69568 5.27252 7.82464 5.43284 7.89887 5.61992L8.31887 6.89992C8.44237 7.25361 8.64409 7.57488 8.909 7.83979C9.1739 8.1047 9.49517 8.30642 9.84887 8.42992L11.0989 8.85992C11.2858 8.92414 11.4471 9.04686 11.5589 9.20992C11.6772 9.37252 11.7403 9.5688 11.7389 9.76992ZM17.5279 4.40992C17.5188 4.59225 17.46 4.76862 17.3579 4.91992C17.2538 5.06252 17.1065 5.16773 16.9379 5.21992L16.3179 5.42992C16.1974 5.47148 16.088 5.5399 15.9979 5.62999C15.9079 5.72008 15.8394 5.82948 15.7979 5.94992L15.5779 6.57992C15.5175 6.73332 15.4174 6.86792 15.2879 6.96992C15.1404 7.08802 14.9568 7.1516 14.7679 7.14992C14.595 7.13919 14.4271 7.0878 14.2779 6.99992C14.1284 6.88978 14.0166 6.73608 13.9579 6.55992L13.7479 5.93992C13.7118 5.81695 13.6426 5.70626 13.5479 5.61992C13.4597 5.52741 13.3497 5.45862 13.2279 5.41992L12.6079 5.21992C12.4429 5.15559 12.298 5.04861 12.1879 4.90992C12.0841 4.76004 12.0283 4.5822 12.0279 4.39992C12.0337 4.21699 12.0928 4.03974 12.1979 3.88992C12.3056 3.75106 12.4516 3.64677 12.6179 3.58992L13.2279 3.38992C13.351 3.34789 13.4636 3.27966 13.5579 3.18992C13.6476 3.09567 13.7158 2.98308 13.7579 2.85992L13.9679 2.23992C14.0279 2.08492 14.1229 1.94792 14.2479 1.83992C14.3913 1.73403 14.5605 1.66843 14.7379 1.64992C14.9266 1.64884 15.1113 1.70459 15.2679 1.80992C15.4088 1.91597 15.5192 2.05742 15.5879 2.21992L15.7979 2.85992C15.8399 2.98308 15.9081 3.09567 15.9979 3.18992C16.0909 3.27629 16.1995 3.34416 16.3179 3.38992L16.9479 3.59992C17.1081 3.66296 17.2493 3.76629 17.3579 3.89992C17.467 4.04771 17.5265 4.22623 17.5279 4.40992Z"
                  fill="url(#paint0_linear_955_5121)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_955_5121"
                    x1="2.26172"
                    y1="12.0004"
                    x2="21.7381"
                    y2="12.0004"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFD079" />
                    <stop offset="1" stop-color="#F87846" />
                  </linearGradient>
                </defs>
              </svg>
              Add New Chapter
            </button>
            <span className="oc-add-hint">
              Reading material, Case Study, and Quiz
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
