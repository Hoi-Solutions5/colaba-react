/**
 * components/SearchInput.jsx
 * Colaba.ai — Search input (dark pill style for navbar)
 *
 * Props:
 *   placeholder : string
 *   value       : string
 *   onChange    : handler
 *   iconSrc     : img src
 */

import React from "react";
import "./SearchInput.css";
import { IMG_SEARCH_ICON } from "../assets/index";

export default function SearchInput({
  placeholder = "Search",
  value,
  onChange,
  iconSrc = IMG_SEARCH_ICON,
}) {
  return (
    <label className="search-input" aria-label={placeholder}>
      <img src={iconSrc} alt="" className="search-input__icon" />
      <input
        type="search"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
    </label>
  );
}
