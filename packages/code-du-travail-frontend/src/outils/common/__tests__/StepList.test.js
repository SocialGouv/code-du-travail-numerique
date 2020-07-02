import { render } from "@testing-library/react";
import React from "react";

import { StepList } from "../StepList";

describe("<StepList />", () => {
  it("should render", () => {
    const items = [
      { label: "Step One", name: "step_1" },
      { label: "Step Two", name: "step_2" },
      { label: "Step Three", name: "step_3" },
    ];

    const { container } = render(<StepList items={items} activeIndex={1} />);
    expect(container).toMatchSnapshot();
  });
});
