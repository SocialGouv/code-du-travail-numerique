import * as React from "react";
import { memo } from "react";

const SvgDirectionLeft = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 15"
    aria-hidden="true"
    {...props}
  >
    <path
      d="m.125 7.153 6-6.284a.526.526 0 0 1 .711-.023c.19.177.203.502.024.688L1.656 7.002H27.5c.276 0 .5.217.5.484a.492.492 0 0 1-.5.483H1.656l5.204 5.469a.493.493 0 0 1-.024.687.52.52 0 0 1-.711-.023l-6-6.284a.506.506 0 0 1 0-.665z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgDirectionLeft);
export default Memo;
