import React from "react";
import { PageTitle, Title, Heading } from ".";
import { Section } from "../layout/Section";

export default {
  title: "Components|Titles"
};

export const base = () => (
  <>
    <Section>
      <PageTitle>This is a page title (h1)</PageTitle>
      <PageTitle as="h2">This is a page title (h2)</PageTitle>
    </Section>
    <Section>
      <Title>This is a title (h2)</Title>
      <Title as="h3">This is a title (h3)</Title>
    </Section>
    <Section>
      <Heading>This is a heading (h3)</Heading>
      <Heading as="h4">This is a heading (h4)</Heading>
    </Section>
  </>
);
