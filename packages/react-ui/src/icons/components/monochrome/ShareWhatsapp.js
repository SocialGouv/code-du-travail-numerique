import * as React from "react";

function SvgShareWhatsapp(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3 10.567A6.518 6.518 0 0015 7.61v-.389A6.596 6.596 0 008.778 1h-.39a6.518 6.518 0 00-2.955.7 6.611 6.611 0 00-3.655 5.911 6.518 6.518 0 00.7 2.956L1 15l4.433-1.478a6.517 6.517 0 002.956.7 6.612 6.612 0 005.911-3.655zm-2.8.228V9.74a.701.701 0 00-.606-.713 4.526 4.526 0 01-.989-.246.705.705 0 00-.742.158l-.447.446A5.626 5.626 0 016.604 7.28l.447-.447a.702.702 0 00.158-.74 4.503 4.503 0 01-.246-.988.702.702 0 00-.704-.604H5.203a.705.705 0 00-.7.766 6.942 6.942 0 001.08 3.045 6.857 6.857 0 002.112 2.108c.914.591 1.954.96 3.037 1.078a.706.706 0 00.768-.702z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgShareWhatsapp = React.memo(SvgShareWhatsapp);
export default MemoSvgShareWhatsapp;
