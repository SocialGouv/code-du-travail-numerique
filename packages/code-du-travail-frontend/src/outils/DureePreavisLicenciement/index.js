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
          // initialStepIndex={4}
          // initialValues={{
          //   fauteGrave: false,
          //   travailleurHandicape: false,
          //   cdt: {
          //     ancienneté: "12| plus de 2 ans"
          //   },
          //   ccn: {
          //     id: "KALICONT000005635413",
          //     slug:
          //       "1527-convention-collective-nationale-de-limmobilier-administrateurs-de-biens",
          //     title:
          //       "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 ",
          //     num: "1527"
          //   },
          //   criteria: {
          //     catégorie: "6| Ouvriers, Employés",
          //     ancienneté: "13| 2 ans ou plus"
          //   }
          // }}
          stepReducer={stepReducer}
        />
      </Container>
    </Section>
  );
}

export { DureePreavisLicenciement };
