import React from "react";
import { Container, Section } from "@socialgouv/react-ui";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function DureePreavisDemission({ title }) {
  return (
    <Section>
      <Container>
        <Wizard
          title={title}
          initialSteps={initialSteps}
          stepReducer={stepReducer}
        />
      </Container>
    </Section>
  );
}

export { DureePreavisDemission };
