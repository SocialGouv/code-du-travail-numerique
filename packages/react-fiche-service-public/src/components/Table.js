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

    const columns = data.$.filter(child => child.name === "Colonne");
    const isHeaderCell = columnIndex => {
      return columns[columnIndex]._.type === ROW_HEADER;
    };

    return (
      <table>
        {title && <caption>{getText(title)}</caption>}
        {headingRow && (
          <thead>
            <tr>
              {headingRow.$.map((th, columnIndex) => (
                <th key={columnIndex}>
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
          {rows.map((tr, rowIndex) => (
            <tr key={rowIndex}>
              {tr.$.map((td, columnIndex) => {
                if (!td.$) {
                  return null;
                }
                const Cell = isHeaderCell(columnIndex) ? "th" : "td";
                return (
                  <Cell key={columnIndex}>
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
