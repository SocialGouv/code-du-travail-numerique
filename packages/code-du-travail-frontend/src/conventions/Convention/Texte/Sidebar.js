import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Section, theme, Wrapper } from "@socialgouv/react-ui";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ node }) => {
  const { children = [] } = node;

  const childSections = children.filter(
    ({ type, data: { surtitre } }) =>
      type === "section" || (type === "article" && surtitre)
  );
  // We want to hide the sidebar if there is less than 2 items
  if (childSections.length < 2) {
    return null;
  }

  return (
    <StyledSection>
      <StyledWrapper variant="dark">
        <ol>
          {children.map((childNode, index) => (
            <SidebarItem key={index} node={childNode} />
          ))}
        </ol>
      </StyledWrapper>
    </StyledSection>
  );
};

SidebarItem.propTypes = {
  node: PropTypes.shape({
    children: PropTypes.array
  }).isRequired
};

export default Sidebar;

const { breakpoints, spacings } = theme;

const StyledSection = styled(Section)`
  @media (min-width: ${breakpoints.tablet}) {
    position: sticky;
    top: 0px;
    flex: 0 1 35%;
    max-height: 100vh;
    padding-right: ${spacings.medium};
  }
`;

const StyledWrapper = styled(Wrapper)`
  max-height: 100%;
  overflow: auto;
`;
