import React from "react";

import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { spacings } from "../theme.js";
import { Heading } from "./Heading";
import { InsertTitle } from "./InsertTitle";
import { PageTitle } from "./PageTitle";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export default {
  component: Title,
  title: "Titles/readme",
};

export const notice = () => (
  <>
    <PageTitle>How it works</PageTitle>
    <Section>
      <Title>Stripes and shifts</Title>
      Some title come with stripes, you can also add/swap horizontal or vertical
      ones ans shift them in some case.
      <br />
      Shifting means that the title will get a negative margin to the left,
      according to the value you provided, making it overlap its container if
      the value is too important. Note that on mobile, negative margin are
      normalize to <code>spacings.small</code>, which is the default padding of
      all layout elements on mobile.
      <Section>
        <Wrapper variant="dark">
          <Heading stripe="left" shift={spacings.larger}>
            This is a badly shifted Heading
          </Heading>
          <Heading stripe="left" shift={spacings.xmedium}>
            This is a correctly shifted Heading
          </Heading>
          <Heading stripe="left" shift={spacings.small}>
            This is a badly shifted Heading
          </Heading>
        </Wrapper>
      </Section>
    </Section>
    <Section>
      <p>Unlike humans, titles are not born equal</p>
      <PageTitle>PageTitle</PageTitle>
      <p>As their name state it, they are top level headings</p>
      <Title>Title</Title>
      <p>For second level titles or important ones</p>
      <Heading>Heading</Heading>
      <p>For title that are not so important</p>
      <InsertTitle>Heading</InsertTitle>
      <p>For insert titles !</p>
      <Subtitle>Subtitles</Subtitle>
      <p>
        Theses one are tiny titles that you can use in cards or to split
        paragraphs under a `Heading` for example
      </p>
      <Section>
        <h1>Default (h1)</h1>
        <p>This is a paragraph</p>
        <h2>Default (h2)</h2>
        <p>This is a paragraph</p>
        <h3>Default (h3)</h3>
        <p>This is a paragraph</p>
        <h4>Default (h4)</h4>
        <p>This is a paragraph</p>
        <h5>Default (h5)</h5>
        <p>This is a paragraph</p>
        <h6>Default (h6)</h6>
        <p>This is a paragraph</p>
      </Section>
    </Section>
  </>
);
