import React from "react";

import { Section } from "../../layout/Section/index.js";
import { InsertTitle } from "./index.js";

export default {
  component: InsertTitle,
  title: "Titles/Components/InsertTitle",
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
