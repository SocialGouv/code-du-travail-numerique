import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Section, theme, Wrapper } from "@cdt/ui-old";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ node }) => {
  const { children, type } = node;
  if (type === "article") {
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

const { breakpoints, spacing } = theme;

const StyledSection = styled(Section)`
  @media (min-width: ${breakpoints.tablet}) {
    flex: 0 1 35%;
    position: sticky;
    top: 0px;
    max-height: 100vh;
    padding-right: ${spacing.interComponent};
  }
`;

const StyledWrapper = styled(Wrapper)`
  max-height: 100%;
  overflow: auto;
`;
