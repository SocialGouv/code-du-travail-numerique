import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs as RootTabs, TabList, TabPanel } from "react-tabs";
import { box, breakpoints, fonts, spacing } from "../theme";

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
  margin-bottom: ${spacing.large};
`;

const StyledTabList = styled(TabList)`
  position: relative;
  top: 1px;
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  list-style-type: none;
  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const StyledTab = styled(Tab)`
  margin-right: ${spacing.tiny};
  padding: ${spacing.small} ${spacing.base};
  color: ${({ theme }) => theme.darkText};
  font-size: ${fonts.sizeH5};
  background-color: ${({ theme }) => theme.darkBackground};
  border: ${box.border};
  border-bottom: 1px solid ${({ theme }) => theme.blueDark};
  border-radius: ${box.lightBorderRadius} ${box.lightBorderRadius} 0 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &[aria-selected="true"] {
    color: ${({ theme }) => theme.primaryText};
    background-color: ${({ theme }) => theme.blueDark};
  }
  @media (max-width: ${breakpoints.tablet}) {
    flex: 1 1 auto;
    margin: ${spacing.tiny};
    border-bottom: ${box.border};
    border-radius: ${box.lightBorderRadius};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  color: ${({ theme }) => theme.darkText};
  background-color: ${({ theme }) => theme.white};
  &.react-tabs__tab-panel--selected {
    padding: ${spacing.base};
    border: 1px solid ${({ theme }) => theme.blueDark};
    border-radius: 0 ${box.borderRadius} ${box.borderRadius} ${box.borderRadius};
    @media (max-width: ${breakpoints.tablet}) {
      margin-top: ${spacing.tiny};
      border-radius: ${box.borderRadius};
    }
  }
`;
