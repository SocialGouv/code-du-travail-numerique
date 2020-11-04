import React from "react";

import { Section } from "../layout/Section";
import { Progress } from ".";

export default {
  component: Progress,
  title: "Components/Progress",
};

export const base = () => (
  <>
    <Section>
      <Progress ratio={0.2} />
    </Section>
    <Section>
      <Progress variant="primary" ratio={0.5} />
    </Section>
    <Section>
      <Progress variant="secondary" ratio={1} />
    </Section>
  </>
);
