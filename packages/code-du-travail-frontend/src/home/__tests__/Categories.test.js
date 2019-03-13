import React from "react";
import { render } from "react-testing-library";
import Categories from "../Categories";

describe("<Categories />", () => {
  it("should render", () => {
    const { container } = render(<Categories />);
    expect(container).toMatchSnapshot();
  });
});
