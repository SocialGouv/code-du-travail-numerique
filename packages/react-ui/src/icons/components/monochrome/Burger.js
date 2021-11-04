import * as React from "react";

function SvgBurger(props) {
  return (
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
        d="M7 11a1 1 0 011-1h16a1 1 0 110 2H8a1 1 0 01-1-1zm0 5a1 1 0 011-1h16a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h16a1 1 0 100-2H8z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgBurger = React.memo(SvgBurger);
export default MemoSvgBurger;
