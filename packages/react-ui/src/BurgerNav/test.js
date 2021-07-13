import "jest-styled-components";

import { render } from "@testing-library/react";
import React from "react";

import { BurgerNav } from "./index.js";
import {
  BurgerNavButton,
  BurgerNavCurrent,
  BurgerNavLink,
} from "./NavItems.js";

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
