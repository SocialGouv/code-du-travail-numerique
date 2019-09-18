import { keyframes } from "styled-components";

export const paleRainbow = keyframes`
  0%{background-position:0% 51%}
  100%{background-position:100% 50%}
`;

export const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

export const fromTop = keyframes`
  0% {transform: translateY(-100%);}
  100% {transform: translateY(0);}
`;

export const fromRight = keyframes`
  0% {transform: translateX(100%);}
  100% {transform: translateX(0);}
`;

export const fromBottom = keyframes`
  0% {transform: translateY(100%);}
  100% {transform: translateY(0);}
`;

export const fromLeft = keyframes`
  0% {transform: translateX(-100%);}
  100% {transform: translateX(0);}
`;
