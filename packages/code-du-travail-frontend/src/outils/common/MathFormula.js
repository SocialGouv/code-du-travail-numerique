import TeX from "@matejmazur/react-katex";
import { theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const asciiMathToTex = (ascii) => {
  // multiplications
  let tex = ascii.replace(/\*/g, `\\times`);
  // divisions
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
        <TeX block>{asciiMathToTex(formula)}</TeX>
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
