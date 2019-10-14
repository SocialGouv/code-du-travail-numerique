import React from "react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Question } from "../icons";
import { LargeLink } from ".";

export default {
  component: LargeLink,
  title: "Components|LargeLink"
};

export const base = () => (
  <Container>
    <Section>
      <LargeLink title="I can get any title" href="#">
        I am a large link which takes all the width
      </LargeLink>
    </Section>
    <Section>
      <LargeLink title="I can get any title" href="#" icon={Question}>
        I can also have an icon
      </LargeLink>
    </Section>
  </Container>
);
