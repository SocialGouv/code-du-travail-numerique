import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import React from "react";

const asciiMathToTex = (ascii) => {
  // multiplications
  let tex = ascii.replace(/\*/g, `\\times`);
  // divisions
  const parenthesisMatcher = `(\\(.+\\))`;
  const nonParenthesisMatcher = `([^()\\s]+)`;
  const fullMatcher = `(?:${parenthesisMatcher}|${nonParenthesisMatcher})`;
  while (tex.includes("/")) {
    tex = tex.replace(
      new RegExp(`${fullMatcher}\\s?\\/\\s?${fullMatcher}`, "gm"),
      `\\frac{$1$2}{$3$4}`
    );
  }
  tex = tex.replace(new RegExp(`\%`, "gm"), `\\%`);
  return tex;
};

type Props = {
  formula: string;
};

export const MathFormula = ({ formula }: Props) => {
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
