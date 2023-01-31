import "jest-styled-components";

import { render } from "@testing-library/react";
import React from "react";

import { BurgerNav } from "./index.js";
import { BurgerNavButton, BurgerNavItem } from "./NavItems.js";

describe("BurgerStyles", () => {
  it("renders", () => {
    const { container } = render(
      <BurgerNav>
        <BurgerNavButton>’Till it goes click</BurgerNavButton>
        <BurgerNavItem
          isCurrent={true}
          href="https://www.youtube.com/watch?v=8xTqP58o1iw&feature=youtu.be&t=20"
        >
          ’Till it goes click
        </BurgerNavItem>
        <BurgerNavItem isCurrent={false}>You said it man</BurgerNavItem>
      </BurgerNav>
    );
    expect(container).toMatchSnapshot();
  });
});
