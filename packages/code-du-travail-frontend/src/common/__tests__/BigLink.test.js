import React from "react";
import { render } from "react-testing-library";
import { BigLink } from "../BigLink";

describe("<BigLink />", () => {
  it("should render with courrier icon", () => {
    const { container } = render(<BigLink />);
    expect(container).toMatchSnapshot();
  });
});
