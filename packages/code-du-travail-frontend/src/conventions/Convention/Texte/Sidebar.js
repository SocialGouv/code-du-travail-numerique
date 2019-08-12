import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Section, theme, Wrapper } from "@cdt/ui";
import { sortByIntOrdre } from "../../utils";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ data }) => {
  const { sections = [], articles = [] } = data;
  const contents = sections
    .concat(articles.filter(article => !!article.surtitre))
    .sort(sortByIntOrdre);

  if (!contents.length || contents.length === 1) return null;
  return (
    <StyledSection>
      <StyledWrapper variant="dark">
        <ol>
          {contents.map((content, index) => (
            <SidebarItem key={index} data={content} />
          ))}
        </ol>
      </StyledWrapper>
    </StyledSection>
  );
};

SidebarItem.propTypes = {
  data: PropTypes.shape({
    surtitle: PropTypes.string,
    sections: PropTypes.array,
    articles: PropTypes.array
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
