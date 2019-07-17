import React from "react";
import { render } from "react-testing-library";
import { FormulaDetails } from "../FormulaDetails";

describe("<FormulaDetails />", () => {
  it("should render", () => {
    const formula = "1337% * 3.14";
    const labels = {
      "value 1": "foo",
      "Value 2": 1
    };
    const { container } = render(
      <FormulaDetails infoCalcul={{ labels, formula }} />
    );
    expect(container).toMatchSnapshot();
  });
});
