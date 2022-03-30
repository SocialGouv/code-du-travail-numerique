import React from "react";

import { Section } from "../layout/Section/index.js";
import { Wrapper } from "../layout/Wrapper/index.js";
import { CodeSnippet } from "./index";

export default {
  component: CodeSnippet,
  title: "Components/CodeSnippet",
};

export const base = () => (
  <>
    <Section>
      <Wrapper style={{ position: "relative" }} variant="light">
        <CodeSnippet title="Your title here">
          <p>Your text here</p>
        </CodeSnippet>
      </Wrapper>
    </Section>
  </>
);
