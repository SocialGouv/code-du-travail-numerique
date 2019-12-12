import React from "react";
import { Heading, PageTitle, Subtitle, Title } from ".";
import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";

export default {
  title: "Components|Titles"
};

export const base = () => (
  <>
    <Section>
      <PageTitle subtitle="With a basic subtitle">
        This is a page title
      </PageTitle>
    </Section>
    <Section>
      <PageTitle
        leftStripped
        subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
      >
        This is a left stripped page title
      </PageTitle>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <PageTitle
          leftStripped
          shift="2.4rem"
          subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
        >
          This is a left stripped shifted page title
        </PageTitle>
      </Wrapper>
    </Section>
    <Section>
      <Title subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup.">
        This is a title (h2)
      </Title>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <Title
          shift="2.4rem"
          subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
        >
          This is a shifted title (h2)
        </Title>
      </Wrapper>
    </Section>
    <Section>
      <Title topStripped subtitle="With a basic subtitle">
        This is a top stripped title (h2)
      </Title>
    </Section>
    <Section>
      <Heading>This is a heading (h3)</Heading>
      <Heading as="h4">This is a heading (h4)</Heading>
    </Section>
    <Section>
      <Subtitle>This is a subtitle</Subtitle>
    </Section>
  </>
);
