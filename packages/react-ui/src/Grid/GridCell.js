import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { breakpoints, spacings } from "../theme.js";
import { GridContext } from "./Grid.js";

export const GridCell = (props) => {
  const columns = useContext(GridContext);
  return <ListItem {...props} columns={columns} />;
};

// The "-1" in width calculation fixes a redenring issue on IE11 causing tile
// supposed to stay on the same line to go to the next line
export const ListItem = styled.li`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  margin: ${spacings.small};
  padding: 0;
  @media (max-width: ${breakpoints.mobile}) {
    flex-shrink: 0;
    min-width: 23rem;
    &:first-of-type {
      margin-left: ${spacings.medium};
    }
    &:last-of-type:after {
      display: block;
      width: ${spacings.medium};
      height: 100%;
      background-color: transparent;
      content: "";
    }
  }
  ${({ columns }) => css`
    width: calc(100% / ${columns} - 2 * ${spacings.small} - 1px);
    @media (max-width: ${breakpoints.desktop}) {
      width: calc(
        100% / ${Math.max(columns - 1, 2)} - 2 * ${spacings.small} - 1px
      );
    }
    @media (max-width: ${breakpoints.tablet}) {
      width: calc(
        100% / ${Math.max(columns - 2, 1)} - 2 * ${spacings.small} - 1px
      );
    }
    @media (max-width: ${breakpoints.mobile}) {
      width: ${Math.max(columns - 2, 1) < 2 ? "80%" : "60%"};
    }
  `}
`;
