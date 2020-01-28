import React from "react";
import { spacings } from "../theme";
import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { Heading } from "./Heading";
import { InsertTitle } from "./InsertTitle";
import { PageTitle } from "./PageTitle";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

export default {
  title: "Titles|Readme"
};

export const readme = () => (
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
      <Wrapper variant="dark">
        <Heading stripped shift={spacings.larger}>
          This is a badly shifted Heading
        </Heading>
        <Heading stripped shift={spacings.xmedium}>
          This is a correctly shifted Heading
        </Heading>
        <Heading stripped shift={spacings.small}>
          This is a badly shifted Heading
        </Heading>
      </Wrapper>
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
    </Section>
  </>
);
