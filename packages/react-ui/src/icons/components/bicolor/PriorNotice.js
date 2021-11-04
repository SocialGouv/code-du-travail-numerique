import * as React from "react";

function SvgPriorNotice(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 2h30a3 3 0 013 3v40a3 3 0 01-3 3h-8v-2h8a1 1 0 001-1V5a1 1 0 00-1-1H12a1 1 0 00-1 1v11H9V5a3 3 0 013-3z"
        fill="#4E6896"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 18V8a1 1 0 011-1h26a1 1 0 011 1v14a1 1 0 01-1 1h-8v24a3 3 0 01-3 3H10a3 3 0 01-3-3V34s0-1 1-1 1 1 1 1v13a1 1 0 001 1h19a1 1 0 001-1V21a1 1 0 00-1-1H10a1 1 0 00-1 1v4s0 1-1 1-1-1-1-1v-4a3 3 0 013-3h3zm15 0h1a3 3 0 013 3v1h2V12h-6v6zm-1 0v-6h-6v6h6zm-7 0v-6h-6v6h6zm15 4h5V12h-5v10zm0-11h5V8h-5v3zm-1-3h-6v3h6V8zm-7 3V8h-6v3h6zm-7 0V8h-6v3h6z"
        fill="#4E6896"
      />
      <path d="M8 30a1 1 0 100-2 1 1 0 000 2z" fill="#4E6896" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 24a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1h-16a1 1 0 01-1-1v-6zm2 5v-4h14v4h-14z"
        fill="#FF7067"
      />
      <path
        d="M11.5 35a1 1 0 100 2h3a1 1 0 100-2h-3zm6.5 0a1 1 0 100 2h3a1 1 0 100-2h-3zm5.5 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-12 3a1 1 0 100 2h3a1 1 0 100-2h-3zm5.5 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm7.5-1a1 1 0 100 2h3a1 1 0 100-2h-3zm-14 5a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm7.5-1a1 1 0 100 2h3a1 1 0 100-2h-3zm5.5 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"
        fill="#FF7067"
      />
    </svg>
  );
}

const MemoSvgPriorNotice = React.memo(SvgPriorNotice);
export default MemoSvgPriorNotice;
