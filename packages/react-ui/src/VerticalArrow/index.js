import styled from "styled-components";
import { ChevronRight } from "react-feather";
import { animations } from "../theme";

const StyledChevronRight = styled(ChevronRight)`
  position: relative;
  transform: rotate(0);
  transition: transform ${animations.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(90deg);
  }
`;

export const VerticalArrow = StyledChevronRight;
