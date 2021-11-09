import * as React from "react";

function SvgShareTwitter(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15 2.007a6.802 6.802 0 01-1.998 1.023 2.832 2.832 0 00-1.46-.94 2.72 2.72 0 00-1.708.107 2.88 2.88 0 00-1.342 1.116c-.328.508-.5 1.11-.492 1.723v.669a6.512 6.512 0 01-3.226-.759 6.893 6.893 0 01-2.501-2.27s-2.546 6.018 3.182 8.693A7.148 7.148 0 011 12.707c5.727 3.344 12.727 0 12.727-7.69 0-.187-.017-.373-.05-.556A5.235 5.235 0 0015 2.007z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgShareTwitter = React.memo(SvgShareTwitter);
export default MemoSvgShareTwitter;
