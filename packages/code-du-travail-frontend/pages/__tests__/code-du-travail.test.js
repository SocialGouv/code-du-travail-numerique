import React from "react";
import { render } from "react-testing-library";
import CodeDuTravail from "../code-du-travail.js";

describe("<CodeDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<CodeDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
