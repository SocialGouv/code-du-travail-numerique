import React from "react";
import PropTypes from "prop-types";
import { BlockMath } from "react-katex";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

export const asciiMathToTex = (ascii) => {
  // multiplications
  let tex = ascii.replace(/\*/g, `\\times`);
  // Divisions
  /* eslint-disable no-useless-escape */
  const parenthesisMatcher = `(\\(.+\\))`;
  const nonParenthesisMatcher = `([^()\\s]+)`;
  const fullMatcher = `(?:${parenthesisMatcher}|${nonParenthesisMatcher})`;
  while (tex.includes("/")) {
    tex = tex.replace(
      new RegExp(`${fullMatcher}\\s?\\/\\s?${fullMatcher}`, "gm"),
      `\\frac{$1$2}{$3$4}`
    );
  }
  /* eslint-enable */
  return tex;
};

export const MathFormula = ({ formula }) => {
  return (
    <Wrapper>
      <StyledFormula>
        <BlockMath>{asciiMathToTex(formula)}</BlockMath>
      </StyledFormula>
    </Wrapper>
  );
};

MathFormula.propTypes = {
  formula: PropTypes.string.isRequired,
};

const { spacings } = theme;

const Wrapper = styled.div`
  margin: ${spacings.base} 0;
`;

const StyledFormula = styled.div`
  display: flex;
`;

export default MathFormula;
