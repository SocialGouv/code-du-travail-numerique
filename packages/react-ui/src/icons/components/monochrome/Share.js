import * as React from "react";

function SvgShare(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 5.2c1.105 0 2-.94 2-2.1 0-1.16-.895-2.1-2-2.1s-2 .94-2 2.1c0 1.16.895 2.1 2 2.1zm-8 4.899c1.105 0 2-.94 2-2.1 0-1.16-.895-2.1-2-2.1s-2 .94-2 2.1c0 1.16.895 2.1 2 2.1zM12 15c1.105 0 2-.94 2-2.1 0-1.16-.895-2.1-2-2.1s-2 .94-2 2.1c0 1.16.895 2.1 2 2.1z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.727 9.057l4.553 2.786m-.006-7.687L5.727 6.942"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgShare;
