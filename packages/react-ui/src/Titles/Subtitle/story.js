import React from "react";

import { Section } from "../../layout/Section";
import { Subtitle } from ".";

export default {
  component: Subtitle,
  title: "Titles|Components/Subtitle",
};

export const base = () => (
  <Section>
    <Subtitle>This is a subtitle</Subtitle>
  </Section>
);
