import React from "react";
import { render } from "@testing-library/react";
import MentionLegales from "../mentions-legales.js";

describe("<MentionLegales />", () => {
  it("should render", () => {
    const { container } = render(<MentionLegales />);
    expect(container).toMatchSnapshot();
  });
});
