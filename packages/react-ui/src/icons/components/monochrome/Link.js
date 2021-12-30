import * as React from "react";
import { memo } from "react";

const SvgLink = (props) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M6.793 8.604a3.018 3.018 0 0 0 4.55.326l1.81-1.812A3.022 3.022 0 0 0 11.009 2a3.015 3.015 0 0 0-2.122.848L7.849 3.88"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.207 7.396a3.018 3.018 0 0 0-3.47-1.021 3.017 3.017 0 0 0-1.08.695l-1.81 1.812A3.022 3.022 0 0 0 4.99 14a3.016 3.016 0 0 0 2.122-.848l1.032-1.033"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Memo = memo(SvgLink);
export default Memo;
