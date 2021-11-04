import * as React from "react";

function SvgMore(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2a1 1 0 00-1 1v4H3a1 1 0 000 2h4v4a1 1 0 102 0V9h4a1 1 0 100-2H9V3a1 1 0 00-1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgMore = React.memo(SvgMore);
export default MemoSvgMore;
