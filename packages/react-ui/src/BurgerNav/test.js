import React from "react";
import { render } from "@testing-library/react";
import { BurgerNav } from "./index";
import { BurgerNavButton, BurgerNavCurrent, BurgerNavLink } from "./NavItems";
import "jest-styled-components";
describe("BurgerStyles", () => {
  it("renders", () => {
    const { container } = render(
      <BurgerNav>
        <BurgerNavButton>’Till it goes click</BurgerNavButton>
        <BurgerNavLink href="https://www.youtube.com/watch?v=8xTqP58o1iw&feature=youtu.be&t=20">
          ’Till it goes click
        </BurgerNavLink>
        <BurgerNavCurrent>You said it man</BurgerNavCurrent>
      </BurgerNav>
    );
    expect(container).toMatchSnapshot();
  });
});
