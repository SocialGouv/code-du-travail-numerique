import React from "react";
import { Tag } from ".";

export default {
  component: Tag,
  title: "Components|Tag"
};

export const base = () => (
  <>
    <Tag variant="primary" shadow>
      Primary tag
    </Tag>
    <Tag shadow>Secondary (default) tag</Tag>
  </>
);
