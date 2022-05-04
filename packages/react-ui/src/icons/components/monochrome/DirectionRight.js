import * as React from "react";
import { memo } from "react";

const SvgDirectionRight = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 15"
    aria-hidden="true"
    {...props}
  >
    <path
      d="m27.875 7.153-6-6.284a.526.526 0 0 0-.711-.023.496.496 0 0 0-.024.688l5.204 5.468H.5c-.276 0-.5.217-.5.484s.224.483.5.483h25.844l-5.204 5.469a.493.493 0 0 0 .024.687.52.52 0 0 0 .711-.023l6-6.284a.506.506 0 0 0 0-.665z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgDirectionRight);
export default Memo;
