import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import OverflowWrapper from "../OverflowWrapper";
import { colors, spacing } from "../theme";

const Table = ({ children, ...props }) => (
  <OverflowWrapper>
    <StyledTable {...props}>{children}</StyledTable>
  </OverflowWrapper>
);

Table.propTypes = {
  children: PropTypes.node.isRequired
};

export default Table;

const StyledTable = styled.table`
  text-align: left;
  empty-cells: show;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid ${colors.elementBorder};

  caption {
    padding: ${spacing.small} 0;
    text-align: center;
    font-style: italic;
  }

  td,
  th {
    padding: ${spacing.small} ${spacing.base};
    border: 1px solid ${colors.elementBorder};
  }

  th {
    background: ${colors.elementBackground};
  }

  thead,
  tfoot {
    padding: ${spacing.small} ${spacing.base};
    vertical-align: bottom;
    background: ${colors.elementBackground};
  }

  tfoot {
    vertical-align: top;
  }
`;
