import { render } from "@testing-library/react";
import React from "react";

import { PageTitle } from "./index.js";

describe("<PageTitle />", () => {
  it("renders a H1 page title", () => {
    const { container } = render(<PageTitle>Lorem Ipsum</PageTitle>);
    expect(container).toMatchSnapshot();
  });
  it("renders a left striped shifted H1 page title", () => {
    const { container } = render(
      <PageTitle stripe="left" shif="10rem">
        Lorem Ipsum
      </PageTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
