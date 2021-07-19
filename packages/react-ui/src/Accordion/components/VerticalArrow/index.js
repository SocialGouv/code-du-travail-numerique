import { ChevronRight } from "react-feather";
import styled from "styled-components";

import { animations } from "../../../theme.js";

const StyledChevronRight = styled(ChevronRight)`
  position: relative;
  flex: 0 0 auto;
  color: ${({ theme }) => theme.secondary};
  transform: rotate(0);
  transition: transform ${animations.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(90deg);
  }
`;

export const VerticalArrow = StyledChevronRight;
