import React from "react";
import PropTypes from "prop-types";

import { SrOnly, Tabs } from "@cdt/ui";

import { ElementBuilder } from "./ElementBuilder";
import { ignoreParagraph } from "../utils";

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

    const tabsData = data.$.map(tab => {
      const title = tab.$.find(el => el.name === "Titre");
      const content = tab.$.filter(el => el.name !== "Titre");
      return {
        tab: (
          <ElementBuilder
            data={ignoreParagraph(title)}
            headingLevel={headingLevel}
          />
        ),
        panel: (
          <>
            <SrOnly>
              <ElementBuilder data={title} headingLevel={headingLevel} />
            </SrOnly>
            <ElementBuilder data={content} headingLevel={headingLevel + 1} />
          </>
        )
      };
    });
    return <Tabs data={tabsData} />;
  }
}

export default Tabulator;
