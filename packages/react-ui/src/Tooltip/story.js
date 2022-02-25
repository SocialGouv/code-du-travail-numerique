import React from "react";

import { Calculator } from "../icons/index.js";
import { Section } from "../layout/Section";
import { Tooltip } from "./index.js";

export default {
  component: Tooltip,
  title: "Components/Tooltip",
};

export const base = () => (
  <>
    <Section>
      <p>
        <Tooltip text="Tooltip content">
          Tooltip will show on mouse enter.
        </Tooltip>
      </p>
      <p>
        This is a text with a tooltip on a
        <Tooltip text="Tooltip content">
          <strong>single</strong>
        </Tooltip>
        world
      </p>
      <p>
        Tooltip can be used with any content:
        <Tooltip text="Tooltip content">
          <Calculator width="2rem" />
        </Tooltip>
      </p>
      <p>
        <Tooltip text="Tooltip content" position="left">
          Tooltip on the left
        </Tooltip>
      </p>
      <p>
        <Tooltip text="Tooltip content" position="right">
          Tooltip on the right
        </Tooltip>
      </p>
      <p>
        <Tooltip text="Tooltip content" position="bottom">
          Tooltip on the bottom
        </Tooltip>
      </p>
      <p>
        <Tooltip text="Tooltip content" background="f5f9fc" textColor="000000">
          Tooltip with custom background color
        </Tooltip>
      </p>
    </Section>
  </>
);
