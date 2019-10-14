import React from "react";
import { variants } from "../theme";
import { Section } from "../layout/Section";
import { Tag } from ".";

export default {
  component: Tag,
  title: "Components|Tag"
};

export const base = () =>
  ["default"].concat(variants).map(variant => (
    <div key={variant}>
      <Section>
        <Tag variant={variant}>{variant} tag</Tag>
      </Section>
      <Section>
        <Tag variant={variant} size="small">
          {variant} small tag
        </Tag>
      </Section>
    </div>
  ));
