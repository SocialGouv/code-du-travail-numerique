import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import ConventionSearch from "../../src/conventions/Search";

const Widget = (): JSX.Element => (
  <Section>
    <Container>
      <ConventionSearch />
    </Container>
    <p>ICI CUSTOM FOOTER</p>
  </Section>
);

export default Widget;
