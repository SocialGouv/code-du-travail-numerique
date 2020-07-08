import "jest-styled-components";

import { render } from "@testing-library/react";
import React from "react";

import { GlobalStyles } from "./index";

describe("GlobalStyles", () => {
  it("generates styles", () => {
    render(<GlobalStyles />);
    const burgerStyles = document.head.getElementsByTagName("style");
    expect(burgerStyles).toMatchSnapshot();
  });
});
