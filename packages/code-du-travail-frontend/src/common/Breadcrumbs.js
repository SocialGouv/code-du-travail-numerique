import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List, ListItem, theme } from "@cdt/ui";

const Breadcrumbs = ({ items = [] }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <Nav className="section">
      <div className="container">
        <List>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <NavItem>{item}</NavItem>
              {index < items.length - 1 && (
                <Separator aria-hidden> » </Separator>
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

export { Breadcrumbs };

const { spacing, colors } = theme;

const Nav = styled.nav`
  background: ${colors.lightGrey};
`;

const NavItem = styled(ListItem)`
  display: inline-block;
  padding: ${spacing.small} ${spacing.medium};
  :first-child {
    padding-left: 0;
  }
`;

const Separator = styled.li`
  display: inline-block;
  pointer-events: none;
  user-select: none;
`;
