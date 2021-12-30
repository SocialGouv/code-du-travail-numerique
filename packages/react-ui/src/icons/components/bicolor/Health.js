import * as React from "react";
import { memo } from "react";

const SvgHealth = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M30 17H10a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5h6v-2h-6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h20v-2zm5 2h6a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H21v2h20a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5h-6v2z"
      fill="#4E6896"
    />
    <path
      d="M16 11a5 5 0 0 1 5-5h9a5 5 0 0 1 5 5v20h-2V11a3 3 0 0 0-3-3h-9a3 3 0 0 0-3 3v6h-2v-6zm17 25v6a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V22h-2v20a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-6h-2z"
      fill="#FF7067"
    />
  </svg>
);

const Memo = memo(SvgHealth);
export default Memo;
