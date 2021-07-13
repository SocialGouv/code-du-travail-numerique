import { render } from "@testing-library/react";
import React from "react";

import { Progress } from "./index.js";

describe("<Progress />", () => {
  it("renders progress bar", () => {
    const { container } = render(<Progress ratio={0.5} />);
    expect(container).toMatchSnapshot();
  });
  it("renders secondary progress secondary", () => {
    const { container } = render(<Progress ratio={0.8} variant="secondary" />);
    expect(container).toMatchSnapshot();
  });
});
