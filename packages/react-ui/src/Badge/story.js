import React from "react";
import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { Check } from "../icons";
import { Badge } from ".";

export default {
  component: Badge,
  title: "Components|Badge",
};

export const base = () => (
  <>
    <Section>
      <Wrapper
        style={{ position: "relative", height: "20rem", width: "30rem" }}
        variant="light"
      >
        <Badge />
      </Wrapper>
    </Section>
    <Section>
      <Wrapper
        variant="light"
        style={{ position: "relative", height: "20rem", width: "30rem" }}
      >
        <Badge icon={Check} variant="secondary" />
        <p>Configured badge (variant secondary with an other icon)</p>
      </Wrapper>
    </Section>
  </>
);
