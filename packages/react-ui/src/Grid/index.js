import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoints, spacings } from "../theme";

const GridContext = React.createContext({ columns: 4 });

export const List = styled.ul`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin-top: ${spacings.medium};
  margin-right: calc(-1 * ${spacings.small});
  margin-bottom: ${spacings.large};
  margin-left: calc(-1 * ${spacings.small});
  padding: 0;
  list-style-type: none;
`;

export const Grid = ({ columns, ...props }) => {
  return (
    <GridContext.Provider value={columns}>
      <List {...props} />
    </GridContext.Provider>
  );
};
Grid.propTypes = {
  columns: PropTypes.number
};
Grid.defaultProps = {
  columns: 4
};

export const GridCell = props => {
  const columns = useContext(GridContext);
  return <ListItem {...props} columns={columns} />;
};

export const ListItem = styled.li`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  width: calc(100% / ${props => props.columns} - 2 * ${spacings.small});
  margin: ${spacings.small};
  @media (max-width: ${breakpoints.tablet}) {
    width: calc(
      100% / ${props => Math.max(props.columns - 1, 0)} - 2 * ${spacings.small}
    );
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: calc(
      100% - ${props => Math.max(props.columns - 2, 0)} * ${spacings.small}
    );
  }
`;
