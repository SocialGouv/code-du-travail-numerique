import React from "react";
import { render } from "@testing-library/react";
import LargeLink from ".";

describe("<LargeLink />", () => {
  test("should render", () => {
    const { container } = render(<LargeLink>Ok</LargeLink>);
    expect(container).toMatchSnapshot();
  });
  test("should render light", () => {
    const { container } = render(<LargeLink variant="light">Ok</LargeLink>);
    expect(container).toMatchSnapshot();
  });
  test("should render highlighted", () => {
    const { container } = render(<LargeLink variant="highlight">Ok</LargeLink>);
    expect(container).toMatchSnapshot();
  });
});
