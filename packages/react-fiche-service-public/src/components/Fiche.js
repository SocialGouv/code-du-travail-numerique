import React from "react";
import styled from "styled-components";

import { ElementBuilder } from "./ElementBuilder";

class FicheServicePublic extends React.PureComponent {
  render() {
    return (
      <Div>
        <ElementBuilder {...this.props} />
      </Div>
    );
  }
}

export default FicheServicePublic;

const Div = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
