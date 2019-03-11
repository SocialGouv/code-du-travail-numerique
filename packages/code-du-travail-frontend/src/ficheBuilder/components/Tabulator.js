import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { colors, spacing, box } from "../cssVariables";
import elementBuilder from "../index";

class Tabulator extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const tabLabels = data.$.map(tab => (
      <Tab>{elementBuilder(tab.$.find(el => el.name === "Titre").$)}</Tab>
    ));
    const tabContents = data.$.map(tab => (
      <TabPanel>
        {elementBuilder(tab.$.find(el => el.name === "Texte").$)}
      </TabPanel>
    ));
    this.state = { tabLabels, tabContents };
  }
  render() {
    const { tabLabels, tabContents } = this.state;
    return (
      <StyledTabs>
        <TabList>{tabLabels}</TabList>
        {tabContents}
      </StyledTabs>
    );
  }
}

Tabulator.propTypes = {
  data: PropTypes.object.isRequired
};

export default Tabulator;

const StyledTabs = styled(Tabs)`
  .react-tabs__tab-list {
    position: relative;
    top: 1px;
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-tabs__tab {
    margin-right: ${spacing.xsmall};
    padding: ${spacing.xsmall};
    background-color: ${colors.white};
    border: 1px solid ${colors.primaryBackground};
    border-top-left-radius: ${box.borderRadius};
    border-top-right-radius: ${box.borderRadius};
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
