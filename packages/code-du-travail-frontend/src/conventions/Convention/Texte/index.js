import React from "react";
import PropTypes from "prop-types";

import { theme } from "@cdt/ui/";
import Sidebar from "./Sidebar";
import ContentWrapper from "./ContentWrapper";
import styled from "styled-components";

const Texte = ({ data, title }) => {
  let rootSection = data;
  // skip the first content level if it's only a "wrapper"
  if (
    rootSection.sections &&
    rootSection.sections.length === 1 &&
    rootSection.sections[0].sections
  ) {
    rootSection = data.sections[0];
  }
  return (
    <Wrapper>
      <Sidebar data={rootSection} />
      <ContentWrapper data={rootSection} title={title} />
    </Wrapper>
  );
};

Texte.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    sections: PropTypes.array
  }).isRequired
};

export default Texte;

const Wrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
  }
`;
