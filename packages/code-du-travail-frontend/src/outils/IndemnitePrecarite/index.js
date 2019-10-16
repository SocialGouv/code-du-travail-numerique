import React from "react";
import { Container, Section } from "@socialgouv/react-ui";

import { Wizard } from "../common/Wizard";

import { StepIntro } from "./steps/Introduction";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepInfoCCn } from "../common/InfosCCn";
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
        <Wizard
          title="Simulateur de la prime de précarité"
          initialSteps={initialSteps}
        />
      </Container>
    </Section>
  );
}

export { SimulateurIndemnitePrecarite };
