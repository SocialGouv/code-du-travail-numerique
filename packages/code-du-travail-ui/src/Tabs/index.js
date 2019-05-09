import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs as RootTabs, TabList, TabPanel } from "react-tabs";
import { box, colors, fonts, spacing } from "../theme";

class Tabs extends React.PureComponent {
  render() {
    const { data, defaultIndex, onSelect, selectedIndex } = this.props;
    const tabs = data.map((item, index) => <Tab key={index}>{item.tab}</Tab>);
    const tabContents = data.map(item => (
      <TabPanel key={item.key}>{item.panel}</TabPanel>
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
        <TabList>{tabs}</TabList>
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
      key: PropTypes.string.isRequired,
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

  .react-tabs__tab-list {
    position: relative;
    top: 1px;
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-tabs__tab {
    margin-right: ${spacing.tiny};
    padding: ${spacing.small} ${spacing.base};
    font-size: ${fonts.sizeH6};
    background-color: ${colors.darkBackground};
    border: 1px solid ${colors.elementBorder};
    border-bottom: 1px solid ${colors.primaryBackground};
    border-top-left-radius: ${box.lightBorderRadius};
    border-top-right-radius: ${box.lightBorderRadius};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .react-tabs__tab--selected {
    color: ${colors.primaryText};
    background-color: ${colors.primaryBackground};
  }

  .react-tabs__tab-panel--selected {
    padding: ${spacing.base};
    border: 1px solid ${colors.primaryBackground};
    border-top-right-radius: ${box.borderRadius};
    border-bottom-right-radius: ${box.borderRadius};
    border-bottom-left-radius: ${box.borderRadius};
  }
`;
