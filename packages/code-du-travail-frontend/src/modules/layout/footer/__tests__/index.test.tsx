import { render } from "@testing-library/react";
import React from "react";
import { Footer } from "..";

describe("<Footer />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
