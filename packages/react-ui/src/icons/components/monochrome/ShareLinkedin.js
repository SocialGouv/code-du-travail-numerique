import * as React from "react";
import { memo } from "react";

const SvgShareLinkedin = (props) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M10.753 5.125a4.21 4.21 0 0 1 2.955 1.208 4.098 4.098 0 0 1 1.225 2.917v4.813h-2.787V9.25c0-.365-.147-.714-.408-.972a1.403 1.403 0 0 0-1.97 0 1.366 1.366 0 0 0-.409.972v4.813H6.573V9.25c0-1.094.44-2.143 1.224-2.917a4.208 4.208 0 0 1 2.956-1.208zm-6.966.688H1v8.25h2.787v-8.25zM2.393 3.75c.77 0 1.394-.616 1.394-1.375C3.787 1.615 3.163 1 2.393 1 1.623 1 1 1.616 1 2.375c0 .76.624 1.375 1.393 1.375z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgShareLinkedin);
export default Memo;
