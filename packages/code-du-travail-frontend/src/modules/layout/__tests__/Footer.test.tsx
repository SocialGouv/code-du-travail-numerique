import { render } from "@testing-library/react";
import React from "react";
import { Footer } from "../Footer";

describe("<Footer />", () => {
  it("should match snapshot", () => {
    expect(render(<Footer />)).toMatchSnapshot();
  });
});
