import React from "react";

import { Section } from "../../layout/Section";
import { Wrapper } from "../../layout/Wrapper";
import { PageTitle } from ".";

export default {
  component: PageTitle,
  title: "Titles|Components/PageTitle"
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
  </>
);
