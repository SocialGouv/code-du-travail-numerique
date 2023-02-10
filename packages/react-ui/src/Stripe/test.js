import { render } from "@testing-library/react";
import React from "react";

import { Stripe } from ".";

describe("<Stripe />", () => {
  it("renders with correct styles", () => {
    const { container } = render(
      <Stripe position="left" length="100%" variant="primary" rounded />
    );
    expect(container).toMatchSnapshot();
  });
});
