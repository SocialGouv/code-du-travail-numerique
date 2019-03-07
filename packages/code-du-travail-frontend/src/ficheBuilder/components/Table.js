import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import elementBuilder from "../index";
import { ignoreParagraph } from "../utils";

class Table extends React.PureComponent {
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
        {title && <caption>{elementBuilder(title.$, headingLevel)}</caption>}
        {headingRow && (
          <thead>
            <tr>
              {headingRow.$.map((th, index) => (
                <th key={index}>
                  {elementBuilder(ignoreParagraph(th.$), headingLevel)}
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
                  {elementBuilder(ignoreParagraph(td.$), headingLevel + 1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired
};

export default Table;
