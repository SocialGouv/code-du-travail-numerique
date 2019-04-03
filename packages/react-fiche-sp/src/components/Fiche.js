import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import FicheBuilder from "./ElementBuilder";

class FicheServicePublic extends React.PureComponent {
  render() {
    return (
      <StyledElementBuilder>
        <FicheBuilder {...this.props} />
      </StyledElementBuilder>
    );
  }
}

FicheServicePublic.propTypes = {
  data: PropTypes.array.isRequired
};

export default FicheServicePublic;

const StyledElementBuilder = styled.div`
  * > *:last-child {
    margin-bottom: 0;
  }
`;
