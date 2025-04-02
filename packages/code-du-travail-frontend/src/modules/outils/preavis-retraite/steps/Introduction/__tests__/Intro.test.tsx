import { render } from "@testing-library/react";
import React from "react";
import StepIntro from "..";

describe("<StepIntro />", () => {
  it("should render", () => {
    expect(render(<StepIntro />)).toBeTruthy();
  });
});
