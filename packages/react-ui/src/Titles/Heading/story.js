import React from "react";

import { spacings } from "../../theme";
import { Section } from "../../layout/Section";
import { Wrapper } from "../../layout/Wrapper";
import { Heading } from ".";
import { Subtitle } from "../Subtitle";

export default {
  component: Heading,
  title: 'Titles/Components/Heading',
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
      <Heading stripped>This is a stripped heading</Heading>
    </Section>
    <Section>
      <Heading variant="primary" stripped>
        This is a stripped primary heading
      </Heading>
    </Section>
    <Section>
      <Wrapper variant="light">
        <Heading stripped shift={spacings.xmedium} as="h4">
          This is a stripped shifted heading (h4)
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
