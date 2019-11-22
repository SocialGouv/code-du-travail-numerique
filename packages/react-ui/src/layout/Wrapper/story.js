import React from "react";
import { PageTitle, Title } from "../../Titles";
import { Section } from "../Section";
import { Wrapper } from ".";

export default {
  component: Wrapper,
  title: "Layout|Components/Wrapper"
};

export const base = () => (
  <>
    <PageTitle>Wrapper</PageTitle>
    <p>
      The Wrapper component adds default or large surrounding paddings and can
      have a specific background-color and border. It is usually the children of
      a Container component.
    </p>
    <Section>
      <Wrapper>
        <Title>Wrapper standard</Title>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="light">
        <Title>Wrapper light</Title>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <Title>Wrapper dark</Title>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
    <Section>
      <Wrapper variant="dark" size="large">
        <Title>Wrapper large dark</Title>
        <div>Lorem ipsum dolor sit amet</div>
      </Wrapper>
    </Section>
  </>
);
