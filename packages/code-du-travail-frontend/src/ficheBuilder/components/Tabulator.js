import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { colors, spacing, box } from "../cssVariables";
import { SrOnly } from "../cssComponents";
import elementBuilder from "../index";
import { ignoreParagraph } from "../utils";

class Tabulator extends React.PureComponent {
  render() {
    const { data, headingLevel: previousHeadingLevel } = this.props;
    const headingLevel =
      previousHeadingLevel > 0
        ? previousHeadingLevel + 1
        : previousHeadingLevel;

    const tabLabels = data.$.map((tab, index) => (
      <Tab key={index}>
        {elementBuilder(
          ignoreParagraph(tab.$.find(el => el.name === "Titre").$),
          headingLevel
        )}
      </Tab>
    ));
    const tabContents = data.$.map((tab, index) => (
      <TabPanel key={index}>
        <SrOnly>
          {elementBuilder(tab.$.find(el => el.name === "Titre"), headingLevel)}
        </SrOnly>
        {elementBuilder(
          tab.$.filter(el => el.name !== "Titre"),
          headingLevel + 1
        )}
      </TabPanel>
    ));

    return (
      <StyledTabs>
        <TabList>{tabLabels}</TabList>
        {tabContents}
      </StyledTabs>
    );
  }
}

Tabulator.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired
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
    margin-right: ${spacing.tiny};
    padding: ${spacing.xsmall};
    background-color: ${colors.white};
    border: 1px solid ${colors.primaryBackground};
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
