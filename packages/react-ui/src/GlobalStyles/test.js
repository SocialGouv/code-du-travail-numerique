import React from "react";
import { render } from "@testing-library/react";
import { GlobalStyles } from "./index";
import "jest-styled-components";
describe("GlobalStyles", () => {
  it("generates styles", () => {
    render(<GlobalStyles />);
    const burgerStyles = document.head.getElementsByTagName("style");
    expect(burgerStyles).toMatchSnapshot();
  });
});
