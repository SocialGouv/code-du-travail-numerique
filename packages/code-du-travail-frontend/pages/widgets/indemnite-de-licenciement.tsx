import tools from "@cdt/data...tools/internals.json";
import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";

const props = tools.find((cc) => cc.icon === "Indemnity");
const Widget = (): JSX.Element => (
  <Section>
    <Container>
      <CalculateurIndemnite {...props} />
    </Container>
    <div>ICI CUSTOM FOOTER</div>
  </Section>
);

export default Widget;
