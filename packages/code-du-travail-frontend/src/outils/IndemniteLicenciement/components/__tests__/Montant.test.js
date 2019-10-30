import React from "react";
import { render } from "@testing-library/react";
import { Montant } from "../Montant";

describe("<Montant />", () => {
  it("renders with ratio", () => {
    const { container } = render(<Montant value={10} ratio={0.7} />);
    expect(container).toMatchSnapshot();
  });
});
