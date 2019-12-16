import React from "react";
import { render } from "@testing-library/react";
import { StepList } from "../StepList";

describe("<StepList />", () => {
  it("should render", () => {
    const items = [
      { name: "step_1", label: "Step One" },
      { name: "step_2", label: "Step Two" },
      { name: "step_3", label: "Step Three" }
    ];

    const { container } = render(<StepList items={items} activeIndex={1} />);
    expect(container).toMatchSnapshot();
  });
});
