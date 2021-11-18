import * as React from "react";

function SvgIndemnity(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#indemnity_svg__clip0)">
        <path
          d="M41 2H11a3 3 0 00-3 3v10s0 1 1 1 1-1 1-1V5a1 1 0 011-1h30a1 1 0 011 1v27h2V5a3 3 0 00-3-3zM30 48v2H10.733a3 3 0 01-3-3V24s0-1 1-1 1 1 1 1v23a1 1 0 001 1H30zM9 20a1 1 0 100-2 1 1 0 000 2z"
          fill="#4E6896"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.935 40.394a3.677 3.677 0 011.192 2.712c0 1.073-.46 2.04-1.192 2.713a3.68 3.68 0 01-2.478 6.394h-10.33c-1.5 0-2.688-1.938-2.688-1.938a3.677 3.677 0 01.753-4.456A3.677 3.677 0 0132 43.106c0-1.072.46-2.039 1.192-2.712A3.68 3.68 0 0135.67 34h9.787a3.68 3.68 0 012.478 6.394zM35.67 50.275h9.787a1.743 1.743 0 000-3.487H35.67a1.743 1.743 0 000 3.487zm0-5.425h9.787a1.743 1.743 0 000-3.488H35.67a1.743 1.743 0 000 3.488zm0-5.425h9.787a1.743 1.743 0 000-3.487H35.67a1.743 1.743 0 000 3.487z"
          fill="#4E6896"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 12a1 1 0 011-1h22a1 1 0 011 1v6a1 1 0 01-1 1H15a1 1 0 01-1-1v-6zm2 5v-4h20v4H16z"
          fill="#FF7067"
        />
        <path
          d="M15 26a1 1 0 100 2h3a1 1 0 100-2h-3zm10 0a1 1 0 100 2h3a1 1 0 100-2h-3zm8 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-18 6a1 1 0 100 2h3a1 1 0 100-2h-3zm9 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-10 7a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm11-1a1 1 0 100 2h3a1 1 0 100-2h-3z"
          fill="#FF7067"
        />
      </g>
      <defs>
        <clipPath id="indemnity_svg__clip0">
          <path fill="#fff" d="M0 0h52v52H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSvgIndemnity = React.memo(SvgIndemnity);
export default MemoSvgIndemnity;
