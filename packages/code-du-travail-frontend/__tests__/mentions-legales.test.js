import React from "react";
import { render } from "../test/utils";
import MentionLegales from "../pages/mentions-legales.js";

describe("<MentionLegales />", () => {
  it("should render", () => {
    const { container } = render(<MentionLegales />);
    expect(container).toMatchSnapshot();
  });
});
