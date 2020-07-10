import { Tabs } from "@socialgouv/cdtn-react-ui";
import PropTypes from "prop-types";
import React from "react";

import { getText } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";

class Tabulator extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired,
  };
  render() {
    const { data, headingLevel: previousHeadingLevel } = this.props;
    const headingLevel =
      previousHeadingLevel > 0
        ? previousHeadingLevel + 1
        : previousHeadingLevel;

    const tabsData = data.children.map((tab) => {
      return {
        panel: (
          <ElementBuilder
            data={tab.children.filter((el) => el.name !== "Titre")}
            headingLevel={headingLevel + 1}
          />
        ),
        tab: (
          <Title level={headingLevel}>
            {getText(tab.children.find((child) => child.name === "Titre"))}
          </Title>
        ),
      };
    });
    return <Tabs data={tabsData} />;
  }
}

export default Tabulator;
