import React from "react";
import { render } from "@testing-library/react";
import MathFormula from "../MathFormula";

describe("<MathFormula />", () => {
  it("should render", () => {
    const { container } = render(<MathFormula>1/4 * Sref * A * 2</MathFormula>);
    expect(container).toMatchSnapshot();
  });
});
