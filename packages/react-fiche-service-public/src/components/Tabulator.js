import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { theme, SrOnly } from "@cdt/ui";

import { ElementBuilder } from "./ElementBuilder";
import { ignoreParagraph } from "../utils";

const { box, colors, fonts, spacing } = theme;

class Tabulator extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired
  };
  render() {
    const { data, headingLevel: previousHeadingLevel } = this.props;
    const headingLevel =
      previousHeadingLevel > 0
        ? previousHeadingLevel + 1
        : previousHeadingLevel;

    const tabLabels = data.$.map((tab, index) => (
      <Tab key={index}>
        <ElementBuilder
          data={ignoreParagraph(tab.$.find(el => el.name === "Titre").$)}
          headingLevel={headingLevel}
        />
      </Tab>
    ));
    const tabContents = data.$.map((tab, index) => (
      <TabPanel key={index}>
        <SrOnly>
          <ElementBuilder
            data={tab.$.find(el => el.name === "Titre")}
            headingLevel={headingLevel}
          />
        </SrOnly>
        <ElementBuilder
          data={tab.$.filter(el => el.name !== "Titre")}
          headingLevel={headingLevel + 1}
        />
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

export default Tabulator;

const StyledTabs = styled(Tabs)`
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
