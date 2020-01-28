import React from "react";

import { Section } from "../../layout/Section";
import { InsertTitle } from ".";

export default {
  component: InsertTitle,
  title: "Titles|Components/InsertTitle"
};

export const base = () => (
  <>
    <Section>
      <InsertTitle>This is an insert title (span as default)</InsertTitle>
    </Section>
    <Section>
      <InsertTitle>This is an insert title (h3)</InsertTitle>
    </Section>
  </>
);
