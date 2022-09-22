import * as React from "react";
import { memo } from "react";

const SvgArrowTurn = (props) => (
  <svg {...props} viewBox="0 0 24 24" width="16" height="16">
    <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" />
  </svg>
);

const Memo = memo(SvgArrowTurn);
export default Memo;
