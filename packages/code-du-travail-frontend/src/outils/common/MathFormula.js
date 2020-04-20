import React from "react";
import PropTypes from "prop-types";
import { BlockMath } from "react-katex";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

const MathFormula = ({ children }) => {
  return (
    <Wrapper>
      <StyledFormula>
        <BlockMath>{children}</BlockMath>
      </StyledFormula>
    </Wrapper>
  );
};

MathFormula.propTypes = {
  children: PropTypes.string,
};

const { spacings } = theme;

const Wrapper = styled.div`
  margin: ${spacings.base} 0;
`;

const StyledFormula = styled.div`
  display: flex;
`;

export default MathFormula;
