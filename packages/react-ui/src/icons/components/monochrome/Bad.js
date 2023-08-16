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
    <title>Avis/Éléments/Mauvais/Emoji/Défaut</title>
    <g
      id="Avis/Éléments/Mauvais/Emoji/Défaut"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Group-3">
        <circle
          id="Oval"
          stroke="#E10600"
          strokeWidth="2"
          fill="#FCE7E6"
          cx="20"
          cy="20"
          r="19"
        />
        <circle id="Oval" fill="#E10600" cx="14" cy="15.2" r="3" />
        <circle id="Oval-Copy" fill="#E10600" cx="26" cy="15.2" r="3" />
        <path
          d="M13.5,29.5 C14,27.5152503 16.001512,25 20,25 C23.998488,25 26,27.5152503 26.5,29.5"
          id="Line-Copy"
          stroke="#E10600"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </g>
    </g>
  </svg>
);

const Memo = memo(SvgArrowTurn);
export default Memo;
