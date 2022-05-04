import * as React from "react";
import { memo } from "react";

const SvgCalculator = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M11 2h30a3 3 0 0 1 3 3v42a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V24s0-1 1-1 1 1 1 1v23a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v10s0 1-1 1-1-1-1-1V5a3 3 0 0 1 3-3z"
      fill="#4E6896"
    />
    <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="#4E6896" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 12a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H15a1 1 0 0 1-1-1v-6zm2 5v-4h20v4H16z"
      fill="#FF7067"
    />
    <path
      d="M15 26a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zm10 0a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zm8 1a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm-18 6a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zm9 1a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm10-1a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zm-20 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1zm11-1a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zm8 1a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1z"
      fill="#FF7067"
    />
  </svg>
);

const Memo = memo(SvgCalculator);
export default Memo;
