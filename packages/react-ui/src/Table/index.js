import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { OverflowWrapper } from "../OverflowWrapper";
import { box, spacings } from "../theme";

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
  border: ${box.border};
  border-collapse: collapse;
  border-spacing: 0;

  caption {
    padding: ${spacings.small} 0;
    font-style: italic;
    text-align: center;
  }

  ${({ theme, stripes }) => {
    if (stripes) {
      return css`
        tr:nth-child(even) {
          background-color: ${theme.bgSecondary};
        }
      `;
    }
  }}

  td,
  th {
    padding: ${spacings.small} ${spacings.base};
    border: ${box.border};
  }

  th {
    color: ${({ theme }) => theme.title};
    font-weight: 600;
    background: ${({ theme }) => theme.bgTertiary};
  }

  thead,
  tfoot {
    padding: ${spacings.small} ${spacings.base};
    vertical-align: bottom;
    background: ${({ theme }) => theme.bgSecondary};
  }

  tfoot {
    vertical-align: top;
  }
`;
