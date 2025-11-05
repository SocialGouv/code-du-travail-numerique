import { render } from "@testing-library/react";
import React from "react";
import { BrandTop } from "../BrandTop";

describe("<BrandTop />", () => {
  it("should match snapshot", () => {
    const { container } = render(<BrandTop />);
    expect(container).toMatchSnapshot();
  });
});
