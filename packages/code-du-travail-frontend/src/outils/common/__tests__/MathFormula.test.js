import { render } from "@testing-library/react";
import React from "react";

import { asciiMathToTex, MathFormula } from "../MathFormula";

const formulae = `26 + (this (is) weird) / (45 (why not)) + 3

 46.7 / 65.2 * 6

47 * (this should be)/okok

(1 / 3) /4 * 7 * 8

 4 / (1 / 3) * 10

6 / (sref)

6 / 3

4 / 10 * Sref * A - 20% * (4 / 10 * Sref * A) + 3 * Sref

20% - 30%

 no no / ok ok ok `;

describe("asciiMathToTex", () => {
  it("gives the correct TeX formula provided a correct ascii input", () => {
    expect(asciiMathToTex(formulae))
      .toMatch(`26 + \\frac{(this (is) weird)}{(45 (why not))} + 3

 \\frac{46.7}{65.2} \\times 6

47 \\times \\frac{(this should be)}{okok}

\\frac{(\\frac{1}{3})}{4} \\times 7 \\times 8

 \\frac{4}{(\\frac{1}{3})} \\times 10

\\frac{6}{(sref)}

\\frac{6}{3}

\\frac{4}{10} \\times Sref \\times A - 20\\% \\times (\\frac{4}{10} \\times Sref \\times A) + 3 \\times Sref

20\\% - 30\\%

 no \\frac{no}{ok} ok ok `);
  });
});
describe("<MathFormula />", () => {
  it("renders", () => {
    const { container } = render(
      <MathFormula formula="1 / 4 * Sref * A * 2" />
    );
    expect(container).toMatchSnapshot();
  });
});
