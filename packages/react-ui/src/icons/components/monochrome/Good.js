import * as React from "react";
import { memo } from "react";

const SvgArrowTurn = (props) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Avis/Éléments/Bon/Emoji/Défaut</title>
    <g
      id="Avis/Éléments/Bon/Emoji/Défaut"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Emoji">
        <circle
          id="Oval"
          stroke="#008941"
          strokeWidth="2"
          fill="#E5F3EC"
          cx="20"
          cy="20"
          r="19"
        />
        <circle id="Oval" fill="#008941" cx="14" cy="15.2" r="3" />
        <circle id="Oval-Copy" fill="#008941" cx="26" cy="15.2" r="3" />
        <path
          d="M13.5,29.5 C14,27.5152503 16.001512,25 20,25 C23.998488,25 26,27.5152503 26.5,29.5"
          id="Line-Copy"
          stroke="#008941"
          strokeWidth="2.3"
          strokeLinecap="round"
          transform="translate(20.000000, 27.250000) scale(1, -1) translate(-20.000000, -27.250000) "
        />
      </g>
    </g>
  </svg>
);

const Memo = memo(SvgArrowTurn);
export default Memo;
