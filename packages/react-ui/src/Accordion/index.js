import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";

import { box, breakpoints, spacings } from "../theme";
import { getTextFromComponent } from "../utils/getTextFromComponent";
import { fadeIn } from "../keyframes";
import { ScreenReaderOnly } from "../ScreenReaderOnly";
import { BaseItem, BaseButton } from "./components/variants/Base";
import {
  MOBILE_NUMBER_WIDTH,
  NUMBER_WIDTH,
  HierarchyItem,
  HierarchyButton
} from "./components/variants/Hierarchy";
import { TileItem, TileButton } from "./components/variants/Tile";

export const Accordion = ({ items, variant, ...props }) => {
  let AccordionItem = BaseItem;
  let AccordionItemButton = BaseButton;
  if (variant === "tile") {
    AccordionItem = TileItem;
    AccordionItemButton = TileButton;
  }
  if (variant === "hierarchy") {
    AccordionItem = HierarchyItem;
    AccordionItemButton = HierarchyButton;
  }

  return (
    <StyledRootAccordion
      variant={variant}
      allowZeroExpanded
      allowMultipleExpanded
      {...props}
    >
      {items.map(({ body, icon, id, title }, index) => (
        <div id={id} key={`${id}-${index}`}>
          {typeof id !== "undefined" &&
            props.preExpanded.find(element => element === id) && (
              <PushBelowHeader />
            )}
          <AccordionItem
            uuid={id}
            index={index}
            isLast={index === items.length - 1}
          >
            <AccordionItemHeading>
              <AccordionItemButton
                icon={icon}
                index={index}
                isLast={index === items.length - 1}
              >
                {getTextFromComponent(title)}
              </AccordionItemButton>
            </AccordionItemHeading>
            <StyledAccordionItemPanel variant={variant}>
              <ScreenReaderOnly>{title}</ScreenReaderOnly>
              <AccordionItemPanelContent>{body}</AccordionItemPanelContent>
            </StyledAccordionItemPanel>
          </AccordionItem>
        </div>
      ))}
    </StyledRootAccordion>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      icon: PropTypes.elementType,
      id: PropTypes.string,
      title: PropTypes.node.isRequired
    })
  ).isRequired,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["base", "tile", "hierarchy"])
};

Accordion.defaultProps = {
  preExpanded: [],
  variant: "base"
};

const StyledRootAccordion = styled(RootAccordion)`
  ${({ variant }) =>
    variant === "tile" &&
    css`
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: calc(50% - (${spacings.medium} / 2));
        &:nth-child(odd) {
          margin-right: ${spacings.medium};
        }
      }
      @media (max-width: ${breakpoints.tablet}) {
        & > div {
          width: 100%;
          &:nth-child(odd) {
            margin-right: 0;
          }
        }
      }
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

  ${({ variant }) => {
    if (variant === "tile") {
      return css`
        @media (max-width: ${breakpoints.mobile}) {
          padding: ${spacings.small};
        }
      `;
    }
    if (variant === "hierarchy") {
      return css`
        margin-left: ${NUMBER_WIDTH};
        background-color: ${({ theme }) => theme.bgSecondary};
        border-radius: 0 0 ${box.borderRadius} ${box.borderRadius};
        border: ${({ theme }) =>
          box.border(theme.noColors ? theme.border : theme.bgSecondary)};
        border-top: transparent;
        animation: none;
        @media (max-width: ${breakpoints.mobile}) {
          margin-left: ${MOBILE_NUMBER_WIDTH};
          padding: ${spacings.small};
        }
      `;
    }
  }}
`;

const AccordionItemPanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
