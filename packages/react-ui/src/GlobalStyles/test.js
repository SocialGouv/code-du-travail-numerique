import "jest-styled-components";

import { render } from "@testing-library/react";
import React from "react";

import { GlobalStyles } from "./index";

describe("GlobalStyles", () => {
  it("generates styles", () => {
    render(<GlobalStyles />);
    const styles = document.head.getElementsByTagName("style");
    expect(styles).toMatchSnapshot();
  });
});
