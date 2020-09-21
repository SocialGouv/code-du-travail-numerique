import React from "react";

import { Section } from "../../layout/Section";
import { Wrapper } from "../../layout/Wrapper";
import { spacings } from "../../theme";
import { Subtitle } from "../Subtitle";
import { Heading } from ".";

export default {
  component: Heading,
  title: "Titles/Components/Heading",
};

export const base = () => (
  <>
    <Section>
      <Heading>This is a heading (h3)</Heading>
    </Section>
    <Section>
      <Heading as="h4">This is a heading (h4)</Heading>
    </Section>
    <Section>
      <Heading striped>This is a striped heading</Heading>
    </Section>
    <Section>
      <Heading variant="primary" striped>
        This is a striped primary heading
      </Heading>
    </Section>
    <Section>
      <Wrapper variant="light">
        <Heading striped shift={spacings.xmedium} as="h4">
          This is a striped shifted heading (h4)
        </Heading>
      </Wrapper>
    </Section>
    <Section>
      <Heading>
        This is a heading with a subtitle inside
        <Subtitle>Subtitle</Subtitle>
      </Heading>
    </Section>
  </>
);
