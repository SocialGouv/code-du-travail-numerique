import React from "react";
import { render } from "@testing-library/react";
import { Tile } from ".";

describe("<Tile />", () => {
  it("renders", () => {
    const { container } = render(<Tile>Hello !</Tile>);
    expect(container).toMatchSnapshot();
  });
});
