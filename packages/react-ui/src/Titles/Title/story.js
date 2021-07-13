import React from "react";

import { Section } from "../../layout/Section/index.js";
import { Wrapper } from "../../layout/Wrapper/index.js";
import { Title } from "./index.js";

export default {
  component: Title,
  title: "Titles/Components/Title",
};

export const base = () => (
  <>
    <Section>
      <Title>This is a basic title (h2)</Title>
    </Section>
    <Section>
      <Title stripe="none">This is an unstriped basic title (h2)</Title>
    </Section>
    <Section>
      <Title variant="primary">This is a basic primary title (h2)</Title>
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
      <Title stripe="top" subtitle="With a basic subtitle">
        This is a top striped title (h2)
      </Title>
    </Section>
  </>
);
