import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { onlyText } from "react-children-utilities";

import { box, breakpoints, fonts, spacings } from "../theme";
import { VerticalArrow } from "../VerticalArrow";
import { fadeIn } from "../keyframes";
import { ScreenReaderOnly } from "../ScreenReaderOnly";

export const Accordion = ({ items, ...props }) => {
  return (
    <RootAccordion allowZeroExpanded allowMultipleExpanded {...props}>
      {items.map(({ body, id, title }, index) => {
        console.log(title);
        return (
          <div id={id} key={`${id}-${index}`}>
            {typeof id !== "undefined" &&
              props.preExpanded.find(element => element === id) && (
                <PushBelowHeader />
              )}
            <StyledAccordionItem uuid={id} index={index}>
              <AccordionItemHeading>
                <StyledAccordionItemButton>
                  <StyledVerticalArrow />
                  <ButtonText>{onlyText(title)}</ButtonText>
                </StyledAccordionItemButton>
              </AccordionItemHeading>
              <StyledAccordionItemPanel>
                <ScreenReaderOnly>{title}</ScreenReaderOnly>
                <AccordionItemPanelContent>{body}</AccordionItemPanelContent>
              </StyledAccordionItemPanel>
            </StyledAccordionItem>
          </div>
        );
      })}
    </RootAccordion>
  );
};

Accordion.propTypes = {
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      id: PropTypes.string,
      title: PropTypes.node.isRequired
    })
  ).isRequired
};

Accordion.defaultProps = {
  preExpanded: []
};

const StyledAccordionItem = styled(AccordionItem)`
  position: relative;
  z-index: 1;
  ${({ index, theme }) =>
    index > 0 &&
    css`
      border-top: ${box.border(theme.border)};
    `}
`;

// This prevents preOpened item to be hidden behind header
const PushBelowHeader = styled.div`
  margin-top: -11rem; /* Fixed header's negative height */
  padding-top: 11rem; /* Fixed header's height */
  visibility: hidden;
  pointer-events: none;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: -6rem;
    padding-top: 6rem;
  }
`;

const StyledVerticalArrow = styled(VerticalArrow)`
  flex: 0 0 auto;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
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

const ButtonText = styled.div`
  margin: ${spacings.medium} 0 ${spacings.medium} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.base};
  animation: ${fadeIn} 0.35s ease-in;
  /* This might not work anymore */
  &.accordion__body--hidden {
    display: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} 0;
  }
`;

const AccordionItemPanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
