import * as React from "react";
import { memo } from "react";

const SvgShareFacebook = (props) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M11.7 1H9.6a3.5 3.5 0 0 0-3.5 3.5v2.1H4v2.8h2.1V15h2.8V9.4H11l.7-2.8H8.9V4.5a.7.7 0 0 1 .7-.7h2.1V1z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgShareFacebook);
export default Memo;
