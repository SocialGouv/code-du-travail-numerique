import React from "react";
import { Section, Container, Wrapper } from "@cdt/ui";

import { Wizard } from "../common/Wizard";

import { StepIntro } from "./steps/Introduction";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepInfosSpecifiques } from "./steps/InfosSpecifiques";
import { StepRemuneration } from "./steps/Remuneration";
import { StepIndemnite } from "./steps/Indemnite";

export const initialSteps = [
  {
    component: StepIntro,
    name: "intro",
    label: "Introduction"
  },
  {
    component: StepInfosGenerales,
    name: "infoGenerales",
    label: "Informations générales"
  },
  {
    component: StepInfosSpecifiques,
    name: "infoSpecifique",
    label: "Situations spécifiques"
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
          <h1>Simulateur d’indemnités de précarité</h1>
          <Wizard initialSteps={initialSteps} />
        </Wrapper>
      </Container>
    </Section>
  );
}

export { SimulateurIndemnitePrecarite };
