import * as React from "react";

function SvgHealth(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M30 17H10a5 5 0 00-5 5v9a5 5 0 005 5h6v-2h-6a3 3 0 01-3-3v-9a3 3 0 013-3h20v-2zm5 2h6a3 3 0 013 3v9a3 3 0 01-3 3H21v2h20a5 5 0 005-5v-9a5 5 0 00-5-5h-6v2z"
        fill="#4E6896"
      />
      <path
        d="M16 11a5 5 0 015-5h9a5 5 0 015 5v20h-2V11a3 3 0 00-3-3h-9a3 3 0 00-3 3v6h-2v-6zm17 25v6a3 3 0 01-3 3h-9a3 3 0 01-3-3V22h-2v20a5 5 0 005 5h9a5 5 0 005-5v-6h-2z"
        fill="#FF7067"
      />
    </svg>
  );
}

export default SvgHealth;
