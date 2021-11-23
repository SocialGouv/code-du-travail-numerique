import * as React from "react";

function SvgMail(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M13.537 3H2.393c-.346 0-.663.11-.907.292l6.479 3.915 6.48-3.915A1.52 1.52 0 0013.536 3z"
        fill="currentColor"
      />
      <path
        d="M14.93 4.75L8.353 8.726a.75.75 0 01-.776 0L1 4.75v6.666c0 .66.627 1.202 1.393 1.202h11.144c.766 0 1.393-.541 1.393-1.202V4.75z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgMail = React.memo(SvgMail);
export default MemoSvgMail;
