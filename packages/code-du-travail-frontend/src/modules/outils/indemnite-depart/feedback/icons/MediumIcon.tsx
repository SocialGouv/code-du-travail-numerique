import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  isActive?: boolean;
};

export const MediumIcon = ({ isActive, ...props }: Props) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Avis/Éléments/Moyen/Emoji/Défaut</title>
    <g
      id="Avis/Éléments/Moyen/Emoji/Défaut"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Emoji">
        <circle
          id="Oval"
          stroke={isActive ? "var(--border-default-blue-france)" : "#FF9940"}
          strokeWidth="2"
          fill="#FFF4EB"
          cx="20"
          cy="20"
          r="19"
        />
        <circle
          id="Oval"
          fill={isActive ? "var(--border-default-blue-france)" : "#FF9940"}
          cx="14"
          cy="15.2"
          r="3"
        />
        <circle
          id="Oval-Copy"
          fill={isActive ? "var(--border-default-blue-france)" : "#FF9940"}
          cx="26"
          cy="15.2"
          r="3"
        />
        <path
          d="M14,27 C16.0110847,27 18.0161231,27 20.0151154,27 C22.0141077,27 24.0090693,27 26,27"
          id="Line-Copy-2"
          stroke={isActive ? "var(--border-default-blue-france)" : "#FF9940"}
          strokeWidth="2.3"
          strokeLinecap="round"
          transform="translate(20.000000, 27.000000) scale(1, -1) translate(-20.000000, -27.000000) "
        />
      </g>
    </g>
  </svg>
);
