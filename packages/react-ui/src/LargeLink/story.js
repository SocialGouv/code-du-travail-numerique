import React from "react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Calculator } from "../icons";
import { LargeLink } from ".";

export default {
  component: LargeLink,
  title: "Components|LargeLink"
};

export const base = () => (
  <Container>
    <Section>
      <LargeLink title="I can get any title" href="#">
        I am a large light link
      </LargeLink>
      <LargeLink variant="dark" title="I can get any title" href="#">
        I am a large dark link
      </LargeLink>
      <LargeLink variant="highlight" title="I can get any title" href="#">
        I am a large highlighted link
      </LargeLink>
      <LargeLink title="I can get any title" href="#" icon={Calculator}>
        <div style={{ width: "3rem" }}>
          <Calculator />
        </div>
        &nbsp;I can have whatever inside
      </LargeLink>
    </Section>
  </Container>
);
