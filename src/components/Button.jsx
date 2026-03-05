/**
 * components/Button.jsx
 * Colaba.ai — Reusable button (primary gradient | outline | icon-only)
 *
 * Props:
 *   variant  : "primary" | "outline" | "icon"
 *   size     : "sm" | "md" (default)
 *   icon     : img src string (optional)
 *   onClick  : handler
 *   href     : render as <a> if provided
 *   children : label text
 */

import React from "react";
import "./Button.css";

export default function Button({
  variant  = "primary",
  size     = "md",
  icon     = null,
  onClick,
  href,
  children,
  className = "",
  ...rest
}) {
  const cls = `colaba-btn colaba-btn--${variant} colaba-btn--${size} ${className}`.trim();

  const inner = (
    <>
      {icon && <img src={icon} alt="" className="colaba-btn__icon" aria-hidden="true" />}
      {children && <span className="colaba-btn__label">{children}</span>}
    </>
  );

  if (href) {
    return <a href={href} className={cls} {...rest}>{inner}</a>;
  }
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
