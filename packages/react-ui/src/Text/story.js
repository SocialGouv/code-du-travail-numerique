import React from "react";

import { Section } from "../layout/Section/index.js";
import { Paragraph as P, Text } from "./index.js";

export default {
  component: Text,
  title: "Components/Text",
};

export const Span = () => (
  <Section>
    <P>
      <Text>This is a basic text</Text>
    </P>
    <P>
      <Text fontSize="small">This is a small text</Text>
    </P>
    <P>
      <Text variant="primary">This is a primary text</Text>
    </P>
    <P>
      <Text variant="secondary">This is a secondary text</Text>
    </P>
    <P>
      <Text variant="secondary" fontSize="hsmall">
        This is a heading small text
      </Text>
    </P>
    <P>
      <Text variant="primary" fontSize="hlarge" fontWeight="700">
        This is a heading large text with (fontWeight 700)
      </Text>
    </P>
  </Section>
);

export const Paragraph = () => (
  <Section>
    <P>This is a basic text</P>
    <P fontSize="small">This is a small text</P>
    <P variant="primary">This is a primary text</P>
    <P variant="secondary">This is a secondary text</P>
    <P variant="secondary" fontSize="hsmall">
      This is a heading small text
    </P>
    <P variant="primary" fontSize="hlarge" fontWeight="700">
      This is a heading large text with (fontWeight 700)
    </P>
  </Section>
);
