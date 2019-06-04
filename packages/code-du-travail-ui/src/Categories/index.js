import styled from "styled-components";
import { spacing } from "../theme";

const Categories = styled.ul`
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

export default Categories;
