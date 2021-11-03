import * as React from "react";

function SvgDownload(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10.95 18.925a.737.737 0 011.02 0l3.299 3.313V4.718c0-.41.34-.718.714-.718a.72.72 0 01.714.717v17.52l3.298-3.312a.737.737 0 011.02 0 .745.745 0 010 1.024l-4.522 4.543a.748.748 0 01-.51.205.748.748 0 01-.51-.205l-4.523-4.543a.687.687 0 010-1.024zM26 22c-.676 0-1 .624-1 1v4H7v-4c0-.41-.27-1-1-1s-1 .624-1 1v5.283c0 .41.34.717.714.717h20.572a.72.72 0 00.714-.717V23c0-.41-.324-1-1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgDownload;
