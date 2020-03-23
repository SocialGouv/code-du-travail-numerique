import React from "react";
import { PageTitle } from "../../Titles/PageTitle";
import { Title } from "../../Titles/Title";
import { Section } from "../Section";
import { Container } from "../Container";
import { Wrapper } from ".";

export default {
  component: Wrapper,
  title: "Layout|Components/Wrapper",
};

export const base = () => (
  <>
    <PageTitle>Wrapper</PageTitle>
    <p>
      The Wrapper component adds default surrounding paddings and can have a
      specific background-color and border or even a shadow for the main one. It
      is usually the children of a Container component.
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
      <Container>
        <Wrapper variant="main" style={{ height: "50rem" }}>
          <Title>Main wrapper</Title>
          <div>Watch it gracefully fade away</div>
        </Wrapper>
      </Container>
    </Section>
  </>
);
