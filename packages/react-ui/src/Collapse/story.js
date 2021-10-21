import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { Collapse } from "./index";

export default {
  component: Collapse,
  title: "Components/Collapse",
};

export const base = () => (
  <>
    <Section>
      <Wrapper style={{ position: "relative" }} variant="light">
        <Collapse title="Your title here">
          <p>Your text here</p>
        </Collapse>
      </Wrapper>
    </Section>
  </>
);
