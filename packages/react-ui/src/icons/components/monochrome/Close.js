import * as React from "react";

function SvgClose(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.752 16.5L7.258 8.591A.957.957 0 017 7.932c0-.247.093-.484.259-.659A.858.858 0 017.883 7a.86.86 0 01.625.273L16 15.183l7.492-7.91A.859.859 0 0124.117 7c.234 0 .459.098.624.273a.957.957 0 01.259.659.957.957 0 01-.259.66L17.249 16.5l7.492 7.909a.958.958 0 01.259.659.957.957 0 01-.259.659.859.859 0 01-.624.273.86.86 0 01-.625-.273L16 17.817l-7.492 7.91a.859.859 0 01-.625.273.859.859 0 01-.624-.273.957.957 0 01-.259-.659.96.96 0 01.259-.66l7.492-7.908z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgClose = React.memo(SvgClose);
export default MemoSvgClose;
