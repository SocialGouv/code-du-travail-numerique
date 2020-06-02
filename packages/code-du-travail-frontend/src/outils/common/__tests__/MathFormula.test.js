import React from "react";
import { render } from "@testing-library/react";
import { asciiMathToTex, MathFormula } from "../MathFormula";

const formulae = `26 + (this (is) weird) / (45 (why not)) + 3

 46.7 / 65.2 * 6

47 * (this should be)/okok

(1 / 3) /4 * 7 * 8

 4 / (1 / 3) * 10

6 / (sref)

6 / 3

 no no / ok ok ok `;

describe("asciiMathToTex", () => {
  it("gives the correct TeX formula provided a correct ascii input", () => {
    expect(asciiMathToTex(formulae)).toMatchSnapshot();
  });
});
describe("<MathFormula />", () => {
  it("renders", () => {
    const { container } = render(
      <MathFormula formula="1 / 4 * Sref * A * 2"></MathFormula>
    );
    expect(container).toMatchSnapshot();
  });
});
