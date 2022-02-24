import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";

const Widget = (): JSX.Element => (
  <Section>
    <Container>
      <CalculateurIndemnite
        title="Simulateur d'indemnité de licenciement"
        icon="Indemnity"
      />
    </Container>
    <div>ICI CUSTOM FOOTER</div>
  </Section>
);

export default Widget;
