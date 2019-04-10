import React from "react";
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

export default FicheServicePublic;

const StyledElementBuilder = styled.div`
  * > *:last-child {
    margin-bottom: 0;
  }
`;
