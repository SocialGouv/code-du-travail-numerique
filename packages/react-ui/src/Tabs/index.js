import PropTypes from "prop-types";
import React from "react";
import { Tab, TabList, TabPanel, Tabs as RootTabs } from "react-tabs";
import styled from "styled-components";

import { OverflowWrapper } from "../OverflowWrapper/index.js";
import { ScreenReaderOnly } from "../ScreenReaderOnly/index.js";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";
import { getTextFromComponent } from "../utils/getTextFromComponent.js";

export const Tabs = (props) => {
  const { data, defaultIndex, onSelect, selectedIndex } = props;

  const refinedProps = {
    onSelect,
    // conditional props
    ...(typeof selectedIndex === "number"
      ? { selectedIndex }
      : { defaultIndex }),
  };

  return (
    <>
      <StyledTabs {...refinedProps}>
        <StyledOverflowWrapper>
          <StyledTabList>
            {data.map(({ tab }, index) => (
              <StyledTab key={index}>{getTextFromComponent(tab)}</StyledTab>
            ))}
          </StyledTabList>
        </StyledOverflowWrapper>
        {data.map(({ tab, panel }, index) => (
          <StyledTabPanel key={index}>
            <ScreenReaderOnly>{tab}</ScreenReaderOnly>
            <TabPanelContent>{panel}</TabPanelContent>
          </StyledTabPanel>
        ))}
      </StyledTabs>
    </>
  );
};

Tabs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      panel: PropTypes.node.isRequired,
      tab: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultIndex: PropTypes.number,
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
};

Tabs.defaultProps = {
  defaultIndex: 0,
  onSelect: () => {},
};

const StyledTabs = styled(RootTabs)`
  margin-bottom: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.medium};
  }
`;

const StyledOverflowWrapper = styled(OverflowWrapper)`
  margin-right: ${spacings.tiny};
`;

const StyledTabList = styled(TabList)`
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  margin: 0;
  padding: 0 0 0 0;
  overflow: visible;
  list-style-type: none;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
`;

const StyledTab = styled(Tab)`
  flex: 1 0 auto;
  max-height: 11rem;
  margin-left: ${spacings.tiny};
  padding: ${spacings.small} ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.border)};
  border-bottom: 1px solid transparent;
  border-radius: ${box.borderRadius} ${box.borderRadius} 0 0;
  cursor: pointer;
  opacity: 1;
  transition: opacity ${animations.transitionTiming} linear;
  &[aria-selected="false"]:hover {
    opacity: 0.7;
  }
  &[aria-selected="true"] {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.secondary};
  }
  @media (max-width: ${breakpoints.tablet}) {
    margin: ${spacings.tiny};
    border-bottom: ${({ theme }) => box.border(theme.border)};
    border-radius: ${box.borderRadius};
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.white};
  &.react-tabs__tab-panel--selected {
    padding: ${spacings.xmedium};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${box.borderRadius};
    @media (max-width: ${breakpoints.tablet}) {
      margin-top: ${spacings.tiny};
    }
    @media (max-width: ${breakpoints.mobile}) {
      padding: ${spacings.small};
    }
  }
`;

const TabPanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
