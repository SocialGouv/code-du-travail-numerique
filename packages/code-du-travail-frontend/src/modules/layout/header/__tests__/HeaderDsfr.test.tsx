import { render } from "@testing-library/react";
import React from "react";

import { Header } from "..";

describe("<Header />", () => {
  it("should match snapshot", () => {
    expect(render(<Header />)).toMatchSnapshot();
  });
});
