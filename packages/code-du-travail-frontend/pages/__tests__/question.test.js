import React from "react";
import { render } from "@testing-library/react";
import Question from "../question.js";

describe("<Question />", () => {
  it("should render", () => {
    const { container } = render(<Question />);
    expect(container).toMatchSnapshot();
  });
});
