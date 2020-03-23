import React from "react";
import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { Stripe } from ".";

export default {
  component: Stripe,
  title: "Components|Stripe",
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
        style={{ position: "relative", height: "10rem" }}
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
