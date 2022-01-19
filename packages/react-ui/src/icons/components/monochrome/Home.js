import * as React from "react";
import { memo } from "react";

const SvgHome = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M12 6.056 8.114 2.197a.166.166 0 0 0-.228 0L4 6.042v6.802c0 .087.069.153.154.153l7.693.015c.08 0 .153-.069.153-.154V6.056zm1 .88.03 6.605c0 .254-.057.459-.317.459H3.5a.464.464 0 0 1-.47-.459L3 6.937l-1.208.993a.474.474 0 0 1-.662-.016.455.455 0 0 1 .014-.65l6.519-6.132a.498.498 0 0 1 .674 0l6.519 6.131a.455.455 0 0 1 .014.651.472.472 0 0 1-.662.016L13 6.937z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgHome);
export default Memo;
