import { Table as UITable } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";

import { getText, ignoreParagraph } from "../utils.js";
import { ElementBuilder } from "./ElementBuilder.js";

const ROW_HEADER = "header";

class Table extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired,
  };
  render() {
    const { data, headingLevel } = this.props;

    const title = data.children.find((child) => child.name === "Titre");
    const headingRows = data.children.filter(
      (child) => child.name === "Rangée" && child.attributes.type === "header"
    );
    const rows = data.children.filter(
      (child) => child.name === "Rangée" && child.attributes.type === "normal"
    );

    const columns = data.children.filter((child) => child.name === "Colonne");
    const isHeaderCell = (columnIndex) => {
      return columns[columnIndex].attributes.type === ROW_HEADER;
    };

    const handleSpan = (el) => {
      let colSpan = 1;
      let rowSpan = 1;
      if (el.attributes) {
        colSpan = el.attributes.fusionHorizontale || 1;
        rowSpan = el.attributes.fusionVerticale || 1;
      }
      return {
        colSpan,
        rowSpan,
      };
    };

    return (
      <UITable>
        {title && <caption>{getText(title)}</caption>}
        {headingRows.length > 0 && (
          <thead>
            {headingRows.map((tr, rowIndex) => (
              <tr key={rowIndex}>
                {tr.children.map((th, columnIndex) => (
                  <th key={columnIndex} {...handleSpan(th)}>
                    {th.children && (
                      <ElementBuilder
                        data={ignoreParagraph(th)}
                        headingLevel={headingLevel}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {rows.map((tr, rowIndex) => (
            <tr key={rowIndex}>
              {tr.children.map((td, columnIndex) => {
                const Cell = isHeaderCell(columnIndex) ? "th" : "td";
                if (!td.children) {
                  return <Cell />;
                }
                return (
                  <Cell key={columnIndex} {...handleSpan(td)}>
                    <ElementBuilder
                      data={ignoreParagraph(td)}
                      headingLevel={headingLevel + 1}
                    />
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </UITable>
    );
  }
}

export default Table;
