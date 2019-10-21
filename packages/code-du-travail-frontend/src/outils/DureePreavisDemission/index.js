import React from "react";
import { Container, Section } from "@socialgouv/react-ui";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function DureePreavisDemission() {
  return (
    <Section>
      <Container>
        <Wizard
          title="Simuler la durée du préavis de démission"
          initialSteps={initialSteps}
          stepReducer={stepReducer}
        />
      </Container>
    </Section>
  );
}

export { DureePreavisDemission };
