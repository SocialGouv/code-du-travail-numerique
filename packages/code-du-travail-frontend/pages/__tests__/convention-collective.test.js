import React from "react";
import { render } from "react-testing-library";
import ConventionCollective from "../convention-collective.js";

describe("<Kali />", () => {
  it("should render", () => {
    const { container } = render(<ConventionCollective />);
    expect(container).toMatchSnapshot();
  });
});
