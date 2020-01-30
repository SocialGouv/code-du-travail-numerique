import React from "react";
import { Section } from "../layout/Section";
import { Tag } from ".";

export default {
  component: Tag,
  title: "Components|Tag"
};

export const base = () => (
  <>
    <Section>
      <Tag variant="primary">Primary tag</Tag>
    </Section>
    <Section>
      <Tag>Secondary (default) tag</Tag>
    </Section>
    <Section>
      <Tag shadow>Secondary (default) tag with shadow</Tag>
    </Section>
  </>
);
