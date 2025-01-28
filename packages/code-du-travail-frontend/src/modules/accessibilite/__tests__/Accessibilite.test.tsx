import { render } from "@testing-library/react";
import React from "react";
import { Accessibilite } from "..";

describe("<Accessibilite />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Accessibilite />);
    expect(container).toMatchSnapshot();
  });
});
