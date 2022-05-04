import * as React from "react";
import { memo } from "react";

const SvgBurger = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H8z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgBurger);
export default Memo;
