import * as React from "react";
import { memo } from "react";

const SvgSearch = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M27.319 25.368a.935.935 0 0 1-1.304 1.341l-6.256-6.012a9.797 9.797 0 0 1-6.092 2.1C8.327 22.798 4 18.59 4 13.4S8.328 4 13.667 4c5.338 0 9.666 4.208 9.666 9.399 0 2.245-.81 4.307-2.16 5.923l6.146 6.046zm-13.652-4.515c4.234 0 7.666-3.337 7.666-7.454 0-4.117-3.432-7.454-7.666-7.454C9.432 5.945 6 9.282 6 13.399c0 4.117 3.432 7.454 7.667 7.454z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgSearch);
export default Memo;
