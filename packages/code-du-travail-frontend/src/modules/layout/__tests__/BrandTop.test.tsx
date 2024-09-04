import { render } from "@testing-library/react";
import React from "react";
import { BrandTop } from "../BrandTop";

describe("<BrandTop />", () => {
  it("should match snapshot", () => {
    expect(render(<BrandTop />)).toMatchSnapshot();
  });
});
