import * as React from "react";
import { memo } from "react";

const SvgArrowRight = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M11.37 7.37 5.296.26A.708.708 0 0 0 4.76 0a.708.708 0 0 0-.537.26A.973.973 0 0 0 4 .89c0 .236.08.462.223.63L9.759 8l-5.536 6.48a.972.972 0 0 0-.223.63c0 .236.08.463.223.63.142.166.335.26.537.26a.709.709 0 0 0 .537-.26l6.072-7.11a.91.91 0 0 0 .165-.29 1.021 1.021 0 0 0 0-.68.91.91 0 0 0-.165-.29z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgArrowRight);
export default Memo;
