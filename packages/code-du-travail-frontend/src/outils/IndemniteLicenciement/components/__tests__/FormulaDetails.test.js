import { render } from "@testing-library/react";
import React from "react";

import { FormulaDetails } from "../FormulaDetails";

describe("<FormulaDetails />", () => {
  it("should render", () => {
    const formula = `1 / 3 * 3.14\\%`;
    const labels = {
      "Value 2": 1,
      "value 1": "foo",
    };
    const { container } = render(
      <FormulaDetails infoCalcul={{ formula, labels }} />
    );
    expect(container).toMatchSnapshot();
  });
});
