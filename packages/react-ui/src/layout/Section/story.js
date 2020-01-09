import React from "react";
import { PageTitle } from "../../Titles/PageTitle";
import { Section } from ".";

export default {
  component: Section,
  title: "Layout|Components/Section"
};

export const base = () => (
  <>
    <PageTitle>Section</PageTitle>
    <p>
      The Section component is a bloc which adds vertical margins and an
      eventual background color
    </p>

    <Section>A basic section</Section>
    <Section variant="light">A light section</Section>
    <Section variant="dark">A dark section</Section>
    <Section>
      <Section decorated variant="light">
        A decorated ligh section
      </Section>
    </Section>
    <Section>
      <Section decorated variant="dark">
        A decorated dark section
      </Section>
    </Section>
    <Section>
      <Section large decorated variant="dark">
        A large decorated dark section
      </Section>
    </Section>
  </>
);
