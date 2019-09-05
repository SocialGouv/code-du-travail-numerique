import React from "react";
import { Section, Container, Wrapper } from "@cdt/ui-old";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function DureePreavisDemission() {
  return (
    <Section>
      <Container>
        <Wrapper size="large" variant="light">
          <h1>Simuler la durée du préavis de démission</h1>
          <Wizard initialSteps={initialSteps} stepReducer={stepReducer} />
        </Wrapper>
      </Container>
    </Section>
  );
}

export { DureePreavisDemission };
