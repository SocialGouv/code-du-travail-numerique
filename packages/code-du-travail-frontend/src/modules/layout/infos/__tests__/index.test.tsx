import { render } from "@testing-library/react";
import React from "react";
import { NeedMoreInfo } from "../index";

describe("<NeedMoreInfo />", () => {
  it("should match snapshot", () => {
    const { container } = render(<NeedMoreInfo />);
    expect(container).toMatchSnapshot();
  });
});
