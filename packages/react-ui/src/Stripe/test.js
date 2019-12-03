import React from "react";
import { render } from "@testing-library/react";
import { Stripe } from ".";

describe("<Table />", () => {
  it("renders", () => {
    const { container } = render(<Stripe />);
    expect(container).toMatchSnapshot();
  });
  it("renders with correct styles", () => {
    const { container } = render(
      <Stripe position="left" length="100%" variant="primary" rounded />
    );
    expect(container).toMatchSnapshot();
  });
});
