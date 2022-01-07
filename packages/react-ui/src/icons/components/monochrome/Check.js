import * as React from "react";
import { memo } from "react";

const SvgCheck = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    {...props}
  >
    <path
      d="m13.815 5.194-5.929 6.739a.744.744 0 0 1-.51.232h-.022a.719.719 0 0 1-.51-.209L3.208 8.32a.699.699 0 0 1 0-.995.699.699 0 0 1 .996 0l3.103 3.103 5.442-6.183a.702.702 0 0 1 .996-.07.73.73 0 0 1 .07 1.02z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgCheck);
export default Memo;
