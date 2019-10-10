import React from "react";
import { render } from "@wrapped-testing-library/react";
import Disclaimer from "../Disclaimer";

describe("<Disclaimer />", () => {
  it("should render", () => {
    const { container } = render(<Disclaimer />);
    expect(container).toMatchSnapshot();
  });
});
