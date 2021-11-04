import * as React from "react";

function SvgArrowDown(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#arrow-down_svg__clip0)">
        <path
          d="M8.425 11.573l7.11-6.072a.709.709 0 00.26-.537.709.709 0 00-.26-.537.973.973 0 00-.629-.223.973.973 0 00-.63.223l-6.48 5.536-6.481-5.536a.973.973 0 00-.63-.223.973.973 0 00-.628.223.708.708 0 00-.261.537c0 .202.094.395.26.537l7.11 6.072a.91.91 0 00.29.165 1.021 1.021 0 00.68 0 .91.91 0 00.29-.165z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="arrow-down_svg__clip0">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSvgArrowDown = React.memo(SvgArrowDown);
export default MemoSvgArrowDown;
