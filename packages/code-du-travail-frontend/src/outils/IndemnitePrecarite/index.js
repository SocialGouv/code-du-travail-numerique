import React from "react";
import { Container, Section, Wrapper } from "@socialgouv/react-ui";

import { Wizard } from "../common/Wizard";

import { StepIntro } from "./steps/Introduction";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepRemuneration } from "./steps/Remuneration";
import { StepIndemnite } from "./steps/Indemnite";

export const initialSteps = [
  {
    component: StepIntro,
    name: "intro",
    label: "Introduction"
  },
  {
    component: StepInfoCCn,
    name: "info_cc",
    label: "Convention collective"
  },
  {
    component: StepInfosGenerales,
    name: "info_generales",
    label: "Informations générales"
  },
  {
    component: StepRemuneration,
    name: "remuneration",
    label: "Rémunération"
  },
  {
    component: StepIndemnite,
    name: "indemnite",
    label: "Indemnité"
  }
];

function SimulateurIndemnitePrecarite() {
  return (
    <Section>
      <Container>
        <Wrapper size="large" variant="light">
          <h1>Simulateur de la prime de précarité</h1>
          <Wizard initialSteps={initialSteps} />
        </Wrapper>
      </Container>
    </Section>
  );
}

export { SimulateurIndemnitePrecarite };
