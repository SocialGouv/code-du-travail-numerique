import * as React from "react";

function SvgExternal(props) {
  return (
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
        d="M9.838 1h4.46c.357 0 .647.29.647.647v4.46a.647.647 0 11-1.295 0V3.282l-6.28 6.28a.645.645 0 01-.916 0 .647.647 0 010-.915l6.353-6.352H9.838a.647.647 0 110-1.295zm1.573 7.166a.647.647 0 111.295 0v5.107A1.73 1.73 0 0110.98 15H2.726A1.728 1.728 0 011 13.274V5.02c0-.952.774-1.726 1.726-1.726h5.125a.647.647 0 110 1.295H2.726a.437.437 0 00-.431.431v8.254c0 .234.197.431.431.431h8.254a.437.437 0 00.431-.431V8.166z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgExternal = React.memo(SvgExternal);
export default MemoSvgExternal;
