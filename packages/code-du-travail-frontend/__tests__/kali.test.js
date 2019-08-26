import React from "react";
import { render } from "@testing-library/react";
import Kali from "../pages/kali.js";

describe("<Kali />", () => {
  it("should render", () => {
    const { container } = render(<Kali />);
    expect(container).toMatchSnapshot();
  });
});
