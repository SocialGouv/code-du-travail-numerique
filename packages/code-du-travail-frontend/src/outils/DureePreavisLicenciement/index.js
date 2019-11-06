import React from "react";
import { Container, Section } from "@socialgouv/react-ui";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function DureePreavisLicenciement() {
  return (
    <Section>
      <Container>
        <Wizard
          title="Simulateur de durée de préavis de licenciement"
          initialSteps={initialSteps}
          stepReducer={stepReducer}
        />
      </Container>
    </Section>
  );
}

export { DureePreavisLicenciement };
