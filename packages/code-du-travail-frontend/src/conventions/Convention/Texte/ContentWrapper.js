import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Content from "./Content";
import { Section, theme, Title } from "@socialgouv/react-ui";

const ContentWrapper = ({ node, title }) => {
  return (
    <StyledSection>
      {title && <Title>{title}</Title>}
      <Content depth={0} node={node} />
    </StyledSection>
  );
};

ContentWrapper.propTypes = {
  node: PropTypes.object.isRequired
};

export default ContentWrapper;

const { breakpoints } = theme;

const StyledSection = styled(Section)`
  @media (min-width: ${breakpoints.tablet}) {
    flex: 0 1 65%;
    overflow: scroll;
  }
`;
