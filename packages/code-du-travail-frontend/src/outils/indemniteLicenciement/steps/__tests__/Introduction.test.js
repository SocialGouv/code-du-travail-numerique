import React from "react";
import { render } from "react-testing-library";
import { StepIntro } from "../Introduction";

describe("<StepIntro />", () => {
  it("should render", () => {
    const { container } = render(<StepIntro />);
    expect(container).toMatchSnapshot();
  });
});
