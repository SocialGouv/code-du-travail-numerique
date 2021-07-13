import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { BurgerNav } from "./index.js";
import {
  BurgerNavButton,
  BurgerNavCurrent,
  BurgerNavLink,
} from "./NavItems.js";

export default {
  component: BurgerNav,
  title: "Components/BurgerNav",
};

export const base = () => (
  <>
    <Section>
      <p>
        The burger nav is only a burger on tablet / mobile. Otherwise it’s
        nothing else than a div taking all the height of its container.
      </p>
      <p>
        You should use the provided nav items, even if you could do without (but
        that would be hard).
      </p>
    </Section>
    <Section>
      <Wrapper variant="dark" style={{ height: "10rem", padding: 0 }}>
        <BurgerNav>
          <BurgerNavButton>NavButton</BurgerNavButton>
          <BurgerNavLink href="https://www.youtube.com/watch?v=8xTqP58o1iw&feature=youtu.be&t=20">
            NavLink
          </BurgerNavLink>
          <BurgerNavCurrent>NavCurrent</BurgerNavCurrent>
        </BurgerNav>
      </Wrapper>
    </Section>
  </>
);
