import React from "react";

import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { BurgerNav } from ".";
import { BurgerNavButton, BurgerNavLink, BurgerNavCurrent } from "./NavItems";

export default {
  component: BurgerNav,
  title: "Components|BurgerNav",
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
      <Wrapper variant="dark" style={{ padding: 0, height: "10rem" }}>
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
