import React from "react";
import PropTypes from "prop-types";

import { ElementBuilder } from "./ElementBuilder";
import { ignoreParagraph, getText } from "../utils";

class Table extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired
  };
  render() {
    const { data, headingLevel } = this.props;

    const title = data.$.find(child => child.name === "Titre");
    const headingRow = data.$.find(
      child => child.name === "Rangée" && child._.type === "header"
    );
    const rows = data.$.filter(
      child => child.name === "Rangée" && child._.type === "normal"
    );

    return (
      <table>
        {title && <caption>{getText(title)}</caption>}
        {headingRow && (
          <thead>
            <tr>
              {headingRow.$.map((th, index) => (
                <th key={index}>
                  <ElementBuilder
                    data={ignoreParagraph(th.$)}
                    headingLevel={headingLevel}
                  />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((tr, index) => (
            <tr key={index}>
              {tr.$.map((td, index) => (
                <td key={index}>
                  <ElementBuilder
                    data={ignoreParagraph(td.$)}
                    headingLevel={headingLevel + 1}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
