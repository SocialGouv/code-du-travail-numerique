import styled from "styled-components";
import { breakpoints, spacing } from "../theme";

export const Grid = styled.ul`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin-top: ${spacing.interComponent};
  margin-right: calc(-1 * ${spacing.small});
  margin-bottom: ${spacing.large};
  margin-left: calc(-1 * ${spacing.small});
  padding: 0;
  list-style-type: none;
`;

export const GridCell = styled.li`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  width: calc(100% / 4 - 2 * ${spacing.small});
  margin: ${spacing.small};
  @media (max-width: ${breakpoints.tablet}) {
    width: calc(100% / 3 - 2 * ${spacing.small});
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100% - 2 * ${spacing.small});
  }
`;
