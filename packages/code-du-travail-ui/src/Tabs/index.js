import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs as RootTabs, TabList, TabPanel } from "react-tabs";
import { box, breakpoints, colors, fonts, spacing } from "../theme";

class Tabs extends React.PureComponent {
  render() {
    const { data, defaultIndex, onSelect, selectedIndex } = this.props;
    const tabs = data.map((item, index) => (
      <StyledTab key={index}>{item.tab}</StyledTab>
    ));
    const tabContents = data.map((item, index) => (
      <StyledTabPanel key={index}>{item.panel}</StyledTabPanel>
    ));

    const props = {
      onSelect,
      // conditional props
      ...(typeof selectedIndex === "number"
        ? { selectedIndex }
        : { defaultIndex })
    };

    return (
      <StyledTabs {...props}>
        <StyledTabList>{tabs}</StyledTabList>
        {tabContents}
      </StyledTabs>
    );
  }
}

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

export default Tabs;

const StyledTabs = styled(RootTabs)`
  margin-bottom: ${spacing.large};
`;

const StyledTabList = styled(TabList)`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  top: 1px;
  margin: 0;
  padding: 0;
  max-width: 100%;
  list-style-type: none;
  overflow-x: auto;
  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const StyledTab = styled(Tab)`
  margin-right: ${spacing.tiny};
  padding: ${spacing.small} ${spacing.base};
  font-size: ${fonts.sizeH5};
  background-color: ${colors.darkBackground};
  border: 1px solid ${colors.elementBorder};
  border-bottom: 1px solid ${colors.primaryBackground};
  border-radius: ${box.lightBorderRadius} ${box.lightBorderRadius} 0 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &[aria-selected="true"] {
    color: ${colors.primaryText};
    background-color: ${colors.primaryBackground};
  }
  @media (max-width: ${breakpoints.tablet}) {
    flex: 1 1 auto;
    margin: ${spacing.tiny};
    border-bottom: 1px solid ${colors.elementBorder};
    border-radius: ${box.lightBorderRadius};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  &.react-tabs__tab-panel--selected {
    padding: ${spacing.base};
    border: 1px solid ${colors.primaryBackground};
    border-radius: 0 ${box.borderRadius} ${box.borderRadius} ${box.borderRadius};
    @media (max-width: ${breakpoints.tablet}) {
      margin-top: ${spacing.tiny};
      border-radius: ${box.borderRadius};
    }
  }
`;
