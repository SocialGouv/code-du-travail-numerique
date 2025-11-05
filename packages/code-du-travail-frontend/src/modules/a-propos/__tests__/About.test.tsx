import { render } from "@testing-library/react";
import React from "react";
import { About } from "..";

describe("<About />", () => {
  it("should match snapshot", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
