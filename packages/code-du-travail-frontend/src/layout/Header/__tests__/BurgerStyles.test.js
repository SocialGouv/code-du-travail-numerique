import React from "react";
import { render } from "@testing-library/react";
import { BurgerStyles } from "../BurgerStyles";
import "jest-styled-components";
describe("BurgerStyles", () => {
  it("generates styles", () => {
    render(<BurgerStyles />);
    const burgerStyles = document.head.getElementsByTagName("style");
    expect(burgerStyles).toMatchSnapshot();
  });
});
