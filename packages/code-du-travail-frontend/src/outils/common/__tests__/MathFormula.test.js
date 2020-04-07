import React from "react";
import { render } from "@testing-library/react";
import MathFormula from "../MathFormula";

describe("<MathFormula />", () => {
  it("should render", () => {
    const { container } = render(<MathFormula math="1/4 * Sref * A" />);
    expect(container).toMatchSnapshot();
  });
});
