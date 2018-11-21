import React from "react";
import { render } from "react-testing-library";
import SeeAlso from "../SeeAlso";

describe("<SeeAlso />", () => {
  it("should render", () => {
    const { container } = render(<SeeAlso />);
    expect(container).toMatchSnapshot();
  });
});
