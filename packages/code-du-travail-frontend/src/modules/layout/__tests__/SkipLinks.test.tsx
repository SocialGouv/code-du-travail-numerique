import { render } from "@testing-library/react";
import React from "react";
import { SkipLinks } from "../SkipLinks";

describe("<SkipLinks />", () => {
  it("should match snapshot", () => {
    const { container } = render(<SkipLinks />);
    expect(container).toMatchSnapshot();
  });
});
