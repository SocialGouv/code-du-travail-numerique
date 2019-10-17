import styled from "styled-components";
import { breakpoints, spacing } from "../theme";

export const Grid = styled.ul`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin: ${-1 * spacing.small};
  padding: 0;
  list-style-type: none;
`;

export const GridCell = styled.li`
  flex-basis: calc(100% / 4 - 2 * ${spacing.small});
  flex-grow: 0;
  flex-shrink: 1;
  margin: ${spacing.small};
  text-align: center;
  @media (max-width: ${breakpoints.tablet}) {
    flex-basis: calc(100% / 3 - 2 * ${spacing.small});
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-basis: calc(100% - 2 * ${spacing.small});
  }
`;
