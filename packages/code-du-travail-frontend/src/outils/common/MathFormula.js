import TeX from "@matejmazur/react-katex";
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
  return tex;
};

export const MathFormula = ({ formula }) => {
  return (
    <StyledFormula>
      <TeX block>{asciiMathToTex(formula)}</TeX>
    </StyledFormula>
  );
};

MathFormula.propTypes = {
  formula: PropTypes.string.isRequired,
};

const StyledFormula = styled.div`
  display: flex;
`;
