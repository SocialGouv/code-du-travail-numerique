import React from "react";

import { Section } from "@socialgouv/code-du-travail-ui";

const Answer = ({ title, html, footer }) => (
  <Section light>
    <header>
      <h2>{title}</h2>
    </header>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <footer>
      <p>{footer}</p>
    </footer>
  </Section>
);

export default Answer;
