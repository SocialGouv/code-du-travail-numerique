import React from "react";
import { render } from "../../../../test/utils";
import { StepItems } from "../StepItems";

describe("<StepItems />", () => {
  it("should render", () => {
    const items = [
      { name: "step_1", label: "Step One" },
      { name: "step_2", label: "Step Two" },
      { name: "step_3", label: "Step Three" }
    ];

    const { container } = render(<StepItems items={items} activeIndex={1} />);
    expect(container).toMatchSnapshot();
  });
});
