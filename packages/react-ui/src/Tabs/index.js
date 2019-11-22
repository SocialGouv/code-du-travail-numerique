import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs as RootTabs, TabList, TabPanel } from "react-tabs";
import { animations, box, breakpoints, fonts, spacings } from "../theme";

export const Tabs = props => {
  const { data, defaultIndex, onSelect, selectedIndex } = props;
  const tabs = data.map((item, index) => (
    <StyledTab key={index}>{item.tab}</StyledTab>
  ));
  const tabContents = data.map((item, index) => (
    <StyledTabPanel key={index}>{item.panel}</StyledTabPanel>
  ));

  const refinedProps = {
    onSelect,
    // conditional props
    ...(typeof selectedIndex === "number"
      ? { selectedIndex }
      : { defaultIndex })
  };

  return (
    <StyledTabs {...refinedProps}>
      <StyledTabList>{tabs}</StyledTabList>
      {tabContents}
    </StyledTabs>
  );
};

Tabs.propTypes = {
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
  defaultIndex: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tab: PropTypes.node.isRequired,
      panel: PropTypes.node.isRequired
    })
  ).isRequired
};

Tabs.defaultProps = {
  defaultIndex: 0,
  onSelect: () => {}
};

const StyledTabs = styled(RootTabs)`
  margin-bottom: ${spacings.large};
`;

const StyledTabList = styled(TabList)`
  position: relative;
  top: 1px;
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow: visible;
  list-style-type: none;
  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const StyledTab = styled(Tab)`
  margin-left: ${spacings.tiny};
  padding: ${spacings.small} ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  background-color: ${({ theme }) => theme.white};
  border: ${box.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
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
    flex: 1 1 auto;
    margin: ${spacings.tiny};
    border-bottom: ${box.border};
    border-radius: ${box.borderRadius};
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
  }
`;
