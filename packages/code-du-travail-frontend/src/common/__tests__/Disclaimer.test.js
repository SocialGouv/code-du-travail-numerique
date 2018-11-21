import React from "react";
import { render } from "react-testing-library";
import Disclaimer from "../Disclaimer";

describe("<Disclaimer />", () => {
  it("should render", () => {
    const { container } = render(<Disclaimer />);
    expect(container).toMatchSnapshot();
  });
});
