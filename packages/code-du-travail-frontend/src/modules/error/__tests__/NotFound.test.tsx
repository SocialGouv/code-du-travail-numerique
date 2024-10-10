import { render } from "@testing-library/react";
import React from "react";
import { NotFound } from "../NotFound";

describe("<NotFound />", () => {
  it("should match snapshot", () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
