import { render } from "@testing-library/react";
import React from "react";

import { StepIntro } from "../Introduction";

describe("<StepIntro />", () => {
  it("should render", () => {
    const { container } = render(<StepIntro />);
    expect(container).toMatchSnapshot();
  });
});
