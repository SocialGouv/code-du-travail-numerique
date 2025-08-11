import { render } from "@testing-library/react";
import React from "react";
import Intro from "../Intro";

describe("<Intro />", () => {
  it("should render", () => {
    expect(render(<Intro />)).toBeTruthy();
  });
});
