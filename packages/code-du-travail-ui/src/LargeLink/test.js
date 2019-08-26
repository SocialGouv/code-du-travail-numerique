import React from "react";
import { render } from "@testing-library/react";
import LargeLink from ".";

describe("<LargeLink />", () => {
  test("should render", () => {
    const { container } = render(<LargeLink>Ok</LargeLink>);
    expect(container).toMatchSnapshot();
  });
});
