import React from "react";
import { render } from "@testing-library/react";
import { Montant } from "../Montant";

describe("<Montant />", () => {
  it("renders with ratio", () => {
    const { container } = render(<Montant value={10} ratio={0.7} />);
    expect(container).toMatchSnapshot();
  });
  it("renders with primary and first", () => {
    const { container } = render(
      <Montant primary first value={10} ratio={0.7} />
    );
    expect(container).toMatchSnapshot();
  });
});
