import React from "react";
import { render } from "@testing-library/react";
import ConventionCollective from "../pages/convention-collective.js";

describe("<ConventionCollective />", () => {
  it("should render", () => {
    const { container } = render(<ConventionCollective />);
    expect(container).toMatchSnapshot();
  });
});
