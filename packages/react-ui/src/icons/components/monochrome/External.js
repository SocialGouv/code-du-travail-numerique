import * as React from "react";
import { memo } from "react";

const SvgExternal = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.838 1h4.46c.357 0 .647.29.647.647v4.46a.647.647 0 1 1-1.295 0V3.282l-6.28 6.28a.645.645 0 0 1-.916 0 .647.647 0 0 1 0-.915l6.353-6.352H9.838a.647.647 0 1 1 0-1.295zm1.573 7.166a.647.647 0 1 1 1.295 0v5.107A1.73 1.73 0 0 1 10.98 15H2.726A1.728 1.728 0 0 1 1 13.274V5.02c0-.952.774-1.726 1.726-1.726h5.125a.647.647 0 1 1 0 1.295H2.726a.437.437 0 0 0-.431.431v8.254c0 .234.197.431.431.431h8.254a.437.437 0 0 0 .431-.431V8.166z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(SvgExternal);
export default Memo;
