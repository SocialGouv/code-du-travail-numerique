import * as React from "react";

function SvgConstitution(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.795 4.4a2 2 0 012.413.01L46 18.751v4.495a2 2 0 01-2 2h-2v17h2a2 2 0 012 2v5H6v-5a2 2 0 012-2h2v-17H8a2 2 0 01-2-2v-4.492l6.89-5.3a1 1 0 011.22 1.585l-4.17 3.207h32.101L25.995 6 20.6 10.046a1 1 0 01-1.2-1.6L24.795 4.4zM44 20.246H8v3h36v-3zm-16 5h-3.5v17H28v-17zm2 17v-17h5v17h-5zm7 0h3v-17h-3v17zm-14.5 0v-17h-5v17h5zm-7 0v-17H12v17h3.5zm-7.5 2v3h36v-3H8z"
        fill="#4E6896"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4 8.446L24.795 4.4a2 2 0 012.413.01L46 18.751v4.495a2 2 0 01-2 2H8a2 2 0 01-2-2v-4.492l6.89-5.3a1 1 0 011.22 1.585l-4.17 3.207h32.101L25.995 6 20.6 10.046a1 1 0 01-1.2-1.6zm24.6 11.8H8v3h36v-3z"
        fill="#FF7067"
      />
      <path d="M17 12.246a1 1 0 100-2 1 1 0 000 2z" fill="#FF7067" />
    </svg>
  );
}

const MemoSvgConstitution = React.memo(SvgConstitution);
export default MemoSvgConstitution;
