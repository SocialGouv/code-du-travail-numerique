import tools from "@cdt/data...tools/internals.json";
import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";

const props = tools.find((cc) => cc.icon === "Indemnity");
const Widget = () => {
  return (
    <Section>
      <Container>
        <CalculateurIndemnite {...props} />
      </Container>
    </Section>
  );
};

export default Widget;
