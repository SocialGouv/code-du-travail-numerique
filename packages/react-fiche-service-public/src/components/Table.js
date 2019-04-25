import React from "react";
import PropTypes from "prop-types";

import { ElementBuilder } from "./ElementBuilder";
import { ignoreParagraph, getText } from "../utils";

const ROW_HEADER = "header";

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

    const isHeaderCellInRow = data.$.filter(
      child => child.name === "Colonne"
    ).map(colonne => colonne._.type === ROW_HEADER);

    return (
      <table>
        {title && <caption>{getText(title)}</caption>}
        {headingRow && (
          <thead>
            <tr>
              {headingRow.$.map((th, index) => (
                <th key={index}>
                  {th.$ && (
                    <ElementBuilder
                      data={ignoreParagraph(th.$)}
                      headingLevel={headingLevel}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((tr, index) => (
            <tr key={index}>
              {tr.$.map((td, index) => {
                if (!td.$) {
                  return null;
                }
                const Cell = isHeaderCellInRow[index] ? "th" : "td";
                return (
                  <Cell key={index}>
                    <ElementBuilder
                      data={ignoreParagraph(td.$)}
                      headingLevel={headingLevel + 1}
                    />
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
