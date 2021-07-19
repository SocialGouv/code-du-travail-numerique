import React from "react";

import { Section } from "../layout/Section/index.js";
import { Progress } from "./index.js";

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
