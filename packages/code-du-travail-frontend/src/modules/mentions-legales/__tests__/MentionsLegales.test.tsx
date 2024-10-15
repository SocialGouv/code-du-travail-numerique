import { render } from "@testing-library/react";
import React from "react";
import { MentionsLegales } from "..";

describe("<MentionsLegales />", () => {
  it("should match snapshot", () => {
    const { container } = render(<MentionsLegales />);
    expect(container).toMatchSnapshot();
  });
});
