import { render } from "@testing-library/react";
import React from "react";

import { InsertTitle } from "./index.js";

describe("<InsertTitle />", () => {
  it("renders an insert title", () => {
    const { container } = render(<InsertTitle>Lorem Ipsum</InsertTitle>);
    expect(container).toMatchSnapshot();
  });
});
