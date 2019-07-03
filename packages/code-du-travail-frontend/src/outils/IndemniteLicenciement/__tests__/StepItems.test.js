import React from "react";
import { render } from "react-testing-library";
import { StepItems } from "../StepItems";

describe("<StepItems />", () => {
  it("should render", () => {
    const items = [
      { name: "step-1", label: "Step One" },
      { name: "step-2", label: "Step Two" },
      { name: "step-3", label: "Step Three" }
    ];

    const { container } = render(<StepItems items={items} activeIndex={1} />);
    expect(container).toMatchSnapshot();
  });
});
