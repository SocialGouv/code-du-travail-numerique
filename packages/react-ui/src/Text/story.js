import React from "react";

import { Section } from "../layout/Section/index.js";
import { Paragraph, Text } from "./index.js";

export default {
  component: Text,
  title: "Components/Text",
};

export const Span = () => (
  <Section>
    <p>
      <Text>This is a basic text</Text>
    </p>
    <p>
      <Text fontSize="small">This is a small text</Text>
    </p>
    <p>
      <Text variant="primary">This is a primary text</Text>
    </p>
    <p>
      <Text variant="secondary">This is a secondary text</Text>
    </p>
    <p>
      <Text variant="secondary" fontSize="hsmall">
        This is a heading small text
      </Text>
    </p>
    <p>
      <Text variant="primary" fontSize="hlarge" fontWeight="700">
        This is a heading large text with (fontWeight 700)
      </Text>
    </p>
  </Section>
);

export const Paragraphe = () => (
  <Section>
    <Paragraph>This is a basic text</Paragraph>
    <Paragraph fontSize="small">This is a small text</Paragraph>
    <Paragraph variant="primary">This is a primary text</Paragraph>
    <Paragraph variant="secondary">This is a secondary text</Paragraph>
    <Paragraph variant="secondary" fontSize="hsmall">
      This is a heading small text
    </Paragraph>
    <Paragraph variant="primary" fontSize="hlarge" fontWeight="700">
      This is a heading large text with (fontWeight 700)
    </Paragraph>
  </Section>
);
