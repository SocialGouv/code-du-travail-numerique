import { render } from "@testing-library/react";
import React from "react";

import { Heading } from ".";

describe("<Heading />", () => {
  it("renders a H3 heading ", () => {
    const { container } = render(<Heading>Lorem Ipsum</Heading>);
    expect(container).toMatchSnapshot();
  });
  it("renders a striped shifted H4 heading ", () => {
    const { container } = render(
      <Heading striped shift="2rem" as="h4">
        Lorem Ipsum
      </Heading>
    );
    expect(container).toMatchSnapshot();
  });
});
