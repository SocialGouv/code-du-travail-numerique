import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { Stripe } from "./index.js";

export default {
  component: Stripe,
  title: "Components/Stripe",
};

export const base = () => (
  <>
    <Section>
      <Wrapper style={{ position: "relative" }} variant="light">
        <Stripe />
        <p>Default stripe</p>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper
        variant="light"
        style={{ height: "10rem", position: "relative" }}
      >
        <Stripe position="left" length="100%" variant="primary" rounded />
        <p>
          Configured stripe (positionned to the left, primary, rounded with full
          length)
        </p>
      </Wrapper>
    </Section>
  </>
);
