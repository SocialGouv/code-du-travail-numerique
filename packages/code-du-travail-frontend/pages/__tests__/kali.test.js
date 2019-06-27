import React from "react";
import { render } from "react-testing-library";
import Kali from "../kali.js";

describe("<Kali />", () => {
  it("should render", () => {
    const { container } = render(<Kali />);
    expect(container).toMatchSnapshot();
  });
});
