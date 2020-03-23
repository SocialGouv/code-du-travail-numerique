import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import { animations, breakpoints, spacings } from "../theme";
import { More } from "../icons";
import { fadeIn } from "../keyframes";

export const MoreContent = ({ children, title, ...props }) => {
  return (
    <StyledAccordion allowZeroExpanded {...props}>
      <>
        <AccordionItem>
          <AccordionItemHeading>
            <StyledAccordionItemButton>
              <MoreIcon />
              <ButtonText>{title}</ButtonText>
            </StyledAccordionItemButton>
          </AccordionItemHeading>
          <StyledAccordionItemPanel>
            <PanelContent>{children}</PanelContent>
          </StyledAccordionItemPanel>
        </AccordionItem>
      </>
    </StyledAccordion>
  );
};

MoreContent.propTypes = {
  children: PropTypes.node.isRequired,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

MoreContent.defaultProps = {
  preExpanded: [],
};

const StyledAccordion = styled(RootAccordion)`
  margin-bottom: ${spacings.xmedium};
`;

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;

const MoreIcon = styled(More)`
  position: relative;
  flex: 0 0 auto;
  width: 2.2rem;
  height: 2.2rem;
  color: ${({ theme }) => theme.primary};
  transform: rotate(0);
  transition: transform ${animations.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(45deg);
  }
`;

const ButtonText = styled.div`
  margin: ${spacings.small} 0 ${spacings.small} ${spacings.small};
`;

const PanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.small} 0 0 ${spacings.large};
  animation: ${fadeIn} ${animations.transitionTiming} ease-in;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} 0;
  }
`;
