import * as React from "react";

function SvgCalendarTime(props) {
  return (
    <svg
      viewBox="0 0 95 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M65.5 8.777H24.683v6H65.5v-6z" fill="#4E6896" />
      <path
        d="M80.916 8.777H70.5v6h10.416A3.088 3.088 0 0184 17.862V30H6V17.862a3.088 3.088 0 013.085-3.085H19.5v-6H9.085A9.095 9.095 0 000 17.862v63.053A9.095 9.095 0 009.085 90h71.831A9.094 9.094 0 0090 80.915V17.862a9.095 9.095 0 00-9.084-9.085zM84 80.915A3.088 3.088 0 0180.916 84H9.085A3.088 3.088 0 016 80.915V36h78v44.915z"
        fill="#4E6896"
      />
      <path
        d="M22 23.556a3 3 0 003-3V3a3 3 0 00-6 0v17.556a3 3 0 003 3z"
        fill="#FF7067"
      />
      <rect x={61} y={40} width={16} height={16} rx={2} fill="#4E6896" />
      <path fill="#FFFFFE" d="M64 43h10v10H64z" />
      <rect x={37} y={40} width={16} height={16} rx={2} fill="#4E6896" />
      <path fill="#FFFFFE" d="M40 43h10v10H40z" />
      <rect x={13} y={40} width={16} height={16} rx={2} fill="#4E6896" />
      <path fill="#FFFFFE" d="M16 43h10v10H16z" />
      <rect x={37} y={64} width={16} height={16} rx={2} fill="#4E6896" />
      <path fill="#FFFFFE" d="M40 67h10v10H40z" />
      <rect x={13} y={64} width={16} height={16} rx={2} fill="#4E6896" />
      <path fill="#FFFFFE" d="M16 67h10v10H16z" />
      <path
        d="M68 23.556a3 3 0 003-3V3a3 3 0 00-6 0v17.556a3 3 0 003 3z"
        fill="#FF7067"
      />
      <path fill="#fff" d="M84 62h6v24h-6z" />
      <path fill="#fff" d="M90 83v7H80v-7z" />
      <path
        d="M93.961 73.991a.7.7 0 010 1.018L83.306 85.076a.7.7 0 01-1.181-.509V64.433a.7.7 0 011.18-.509l10.656 10.067z"
        fill="#FF7067"
      />
      <path fill="#FF7067" d="M60 70h22.5v9H60z" />
    </svg>
  );
}

export default SvgCalendarTime;
