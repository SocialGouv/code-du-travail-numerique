import React from "react";

const SvgBurger = props => (
  <svg viewBox="0 0 32 32" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11a1 1 0 011-1h16a1 1 0 110 2H8a1 1 0 01-1-1zm0 5a1 1 0 011-1h16a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h16a1 1 0 100-2H8z"
      fill="currentColor"
    />
  </svg>
);

export default SvgBurger;
