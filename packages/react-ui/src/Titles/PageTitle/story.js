import React from "react";

import { Section } from "../../layout/Section/index.js";
import { Wrapper } from "../../layout/Wrapper/index.js";
import { PageTitle } from "./index.js";

export default {
  component: PageTitle,
  title: "Titles/Components/PageTitle",
};

export const base = () => (
  <>
    <Section>
      <PageTitle>This is a basic page title</PageTitle>
    </Section>
    <Section>
      <PageTitle variant="primary">This is a primary page title</PageTitle>
    </Section>
    <Section>
      <PageTitle subtitle="With a basic subtitle">
        This is a page title
      </PageTitle>
    </Section>
    <Section>
      <PageTitle
        stripe="left"
        subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
      >
        This is a left striped page title
      </PageTitle>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <PageTitle
          stripe="left"
          shift="2.4rem"
          subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
        >
          This is a left striped shifted page title
        </PageTitle>
      </Wrapper>
    </Section>
  </>
);
