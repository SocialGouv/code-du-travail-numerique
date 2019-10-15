import React from "react";
import { Section } from "../Section";
import { Wrapper } from ".";

export default {
  component: Wrapper,
  title: "Layout|Components/Wrapper"
};

export const base = () => (
  <>
    <h1>Wrapper</h1>
    <p>
      The Wrapper component adds default or large surrounding paddings and can
      have a specific background-color and border. It is usually the children of
      a Container component.
    </p>
    <Section>
      <Wrapper>
        <h2>Wrapper standard</h2>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="light">
        <h2>Wrapper light</h2>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <h2>Wrapper dark</h2>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="dark" size="large">
        <h2>Wrapper large dark</h2>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
  </>
);
