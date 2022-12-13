import { Heading, Tabs } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";

import { getText } from "../utils.js";
import { ElementBuilder } from "./ElementBuilder.js";

class Tabulator extends React.PureComponent {
  render() {
    const { data, headingLevel: previousHeadingLevel } = this.props;
    const headingLevel =
      previousHeadingLevel > 0 ? previousHeadingLevel + 1 : 1;

    const tabsData = data.children.map((tab) => {
      return {
        panel: (
          <ElementBuilder
            data={tab.children.filter((el) => el.name !== "Titre")}
            headingLevel={headingLevel}
          />
        ),
        tab: (
          <Heading as={"h" + (headingLevel + 1)}>
            {getText(tab.children.find((child) => child.name === "Titre"))}
          </Heading>
        ),
      };
    });
    return <Tabs data={tabsData} />;
  }
}

Tabulator.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired,
};

export default Tabulator;
