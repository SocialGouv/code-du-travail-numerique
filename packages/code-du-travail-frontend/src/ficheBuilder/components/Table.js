import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import elementBuilder from "../index";

class Table extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const title = data.$.find(child => child.name === "Titre");
    const headingRow = data.$.find(
      child => child.name === "Rangée" && child._.type === "header"
    );
    const rows = data.$.filter(
      child => child.name === "Rangée" && child._.type === "normal"
    );
    this.state = { title, headingRow, rows };
  }
  render() {
    const { title, headingRow, rows } = this.state;
    return (
      <table>
        {title && <caption>{elementBuilder(title.$)}</caption>}
        {headingRow && (
          <thead>
            <tr>
              {headingRow.$.map((th, index) => (
                <th key={index}>{elementBuilder(th.$)}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((tr, index) => (
            <tr key={index}>
              {tr.$.map((td, index) => (
                <td key={index}>{elementBuilder(td.$)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.object.isRequired
};

export default Table;
