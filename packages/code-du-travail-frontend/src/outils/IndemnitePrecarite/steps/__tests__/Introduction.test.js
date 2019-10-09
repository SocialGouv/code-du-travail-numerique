import React from "react";
import { render } from "../../../../../test/utils";
import { StepIntro } from "../Introduction";

describe("<StepIntro />", () => {
  it("should render", () => {
    const { container } = render(<StepIntro />);
    expect(container).toMatchSnapshot();
  });
});
