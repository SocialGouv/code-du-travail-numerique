import * as React from "react";
import { memo } from "react";

const SvgWarning = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M44.586 36.215h.921l-.502-.773-8.424-12.96a.5.5 0 1 1 .838-.545l9.429 14.505a.5.5 0 0 1-.42.773H5.571a.5.5 0 0 1-.419-.773L25.581 5.014a.5.5 0 0 1 .838 0l5.107 7.857a.5.5 0 0 1-.838.545l-4.269-6.567-.42-.645-.418.645L6.995 35.442l-.502.773h38.093zM34.5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
      fill="#3E486E"
      stroke="#4E6896"
    />
    <path
      d="M26 14.714a1.57 1.57 0 0 0-1.571 1.571v9.429a1.571 1.571 0 0 0 3.143 0v-9.429c0-.868-.704-1.571-1.572-1.571zm0 14.143A1.571 1.571 0 1 0 26 32a1.571 1.571 0 0 0 0-3.143z"
      fill="#FF7067"
    />
  </svg>
);

const Memo = memo(SvgWarning);
export default Memo;
