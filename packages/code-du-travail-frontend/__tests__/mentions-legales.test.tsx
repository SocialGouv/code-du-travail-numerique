import { render } from "@testing-library/react";
import React from "react";

import MentionLegales from "../pages/mentions-legales";

describe("<MentionLegales />", () => {
  it("should render", () => {
    const { container } = render(<MentionLegales />);
    expect(container).toMatchSnapshot();
  });
});
