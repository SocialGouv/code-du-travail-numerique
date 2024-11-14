import React from "react";

import { getTitleInChildren, ignoreParagraph } from "../utils";
import { ElementBuilder } from "./ElementBuilder";

const ROW_HEADER = "header";

export const Table = ({
  data,
  headingLevel,
}: {
  data: any;
  headingLevel: number;
}) => {
  const title = getTitleInChildren(data);
  const headingRows = data.children.filter(
    (child) =>
      child.name === "Rangée" &&
      child.type === "element" &&
      child.attributes!.type === "header"
  );
  const rows = data.children.filter(
    (child) =>
      child.name === "Rangée" &&
      child.type === "element" &&
      child.attributes!.type === "normal"
  );

  const columns = data.children.filter((child) => child.name === "Colonne");
  const isHeaderCell = (columnIndex) => {
    return columns[columnIndex].attributes!.type === ROW_HEADER;
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
    <div className="fr-table--sm fr-table fr-table">
      <div className="fr-table__wrapper">
        <div className="fr-table__container">
          <div className="fr-table__content">
            <table>
              {title && <caption>{title}</caption>}
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
                        return <Cell key={columnIndex} />;
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
