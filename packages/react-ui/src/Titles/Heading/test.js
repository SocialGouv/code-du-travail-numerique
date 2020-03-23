import React from "react";
import { render } from "@testing-library/react";
import { Heading } from ".";

describe("<Heading />", () => {
  it("renders a H3 heading ", () => {
    const { container } = render(<Heading>Lorem Ipsum</Heading>);
    expect(container).toMatchSnapshot();
  });
  it("renders a stripped shifted H4 heading ", () => {
    const { container } = render(
      <Heading stripped shift="2rem" as="h4">
        Lorem Ipsum
      </Heading>,
    );
    expect(container).toMatchSnapshot();
  });
});
