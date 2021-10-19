import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import ConventionSearch from "../../src/conventions/Search";

const Widget = () => {
  return (
    <Section>
      <Container>
        <ConventionSearch />
      </Container>
    </Section>
  );
};

export default Widget;
