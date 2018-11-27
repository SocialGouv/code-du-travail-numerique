import React from "react";
import { render } from "react-testing-library";
import Header from "../Header";

describe("<Header />", () => {
  it("should render", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
