import TeX from "@matejmazur/react-katex";
import PropTypes from "prop-types";
import React from "react";

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
      `\\frac{$1$2}{$3$4}`,
    );
  }
  tex = tex.replace(new RegExp(`\%`, "gm"), `\\%`);
  return tex;
};

export const MathFormula = ({ formula }) => {
  return (
    <TeX
      title={formula.replace(/\*/g, `x`)}
      block
      style={{ width: "fit-content", overflow: "auto" }}
    >
      {asciiMathToTex(formula)}
    </TeX>
  );
};

MathFormula.propTypes = {
  formula: PropTypes.string.isRequired,
};
