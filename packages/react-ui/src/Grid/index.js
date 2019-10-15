import styled from "styled-components";
import { breakpoints, spacing } from "../theme";

export const Grid = styled.ul`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  list-style-type: none;
  padding: 0;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin: ${-1 * spacing.small};
`;

export const GridCell = styled.li`
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: calc(100% / 4 - 2 * ${spacing.small});
  @media (max-width: ${breakpoints.tablet}) {
    flex-basis: calc(100% / 3 - 2 * ${spacing.small});
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-basis: calc(100% - 2 * ${spacing.small});
  }
  margin: ${spacing.small};
  text-align: center;
`;
