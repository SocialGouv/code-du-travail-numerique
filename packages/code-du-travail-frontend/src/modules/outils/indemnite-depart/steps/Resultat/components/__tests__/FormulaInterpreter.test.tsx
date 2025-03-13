import { render } from "@testing-library/react";
import React from "react";
import FormulaInterpreter from "../FormulaInterpreter";

describe("<FormulaInterpreter />", () => {
  it("should render", () => {
    const { queryByText } = render(
      <FormulaInterpreter
        formula={{
          explanations: ["Ancienneté : 10 ans"],
          formula: "10 * 12",
        }}
      />
    );
    expect(queryByText(/Ancienneté : 10 ans/i)).toBeInTheDocument();
  });
});
