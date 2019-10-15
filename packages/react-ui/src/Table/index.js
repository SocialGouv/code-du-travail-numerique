import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { OverflowWrapper } from "../OverflowWrapper";
import { box, spacing } from "../theme";

export const Table = ({ children, ...props }) => (
  <OverflowWrapper>
    <StyledTable {...props}>{children}</StyledTable>
  </OverflowWrapper>
);

Table.propTypes = {
  children: PropTypes.node.isRequired
};

const StyledTable = styled.table`
  text-align: left;
  empty-cells: show;
  background-color: ${({ theme }) => theme.white};
  border-collapse: collapse;
  border-spacing: 0;
  border: ${box.border};

  caption {
    padding: ${spacing.small} 0;
    text-align: center;
    font-style: italic;
  }

  ${props =>
    props.stripes &&
    css`
      tr:nth-child(even) {
        background-color: ${({ theme }) => theme.lightBackground}};
      }
    `}

  td,
  th {
    padding: ${spacing.small} ${spacing.base};
    border: ${box.border};
  }

  th {
    background: ${({ theme }) => theme.darkBackgorund};
  }

  thead,
  tfoot {
    padding: ${spacing.small} ${spacing.base};
    vertical-align: bottom;
    background: ${({ theme }) => theme.lightBackground};
  }

  tfoot {
    vertical-align: top;
  }
`;
