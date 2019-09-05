import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, List, ListItem, Section, theme } from "@cdt/ui-old";

const Breadcrumbs = ({ items = [] }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <Nav>
      <Section>
        <Container>
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
        </Container>
      </Section>
    </Nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node)
};

export { Breadcrumbs };

const { spacing, colors } = theme;

const Nav = styled.nav`
  background: ${colors.infoBackground};
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
