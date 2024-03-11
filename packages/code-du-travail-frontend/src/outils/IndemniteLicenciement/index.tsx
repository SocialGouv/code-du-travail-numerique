import React from "react";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../CommonIndemniteDepart";
import { IndemniteDepartType } from "../types";
import { Step } from "../Simulator";
import {
  StepAgreement,
  StepAnciennete,
  StepContratTravail,
  StepInformations,
  StepIntro,
  StepResultat,
  StepSalaires,
} from "../CommonIndemniteDepart/steps";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};

const steps: Step<IndemniteDepartStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteDepartStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Contrat de travail",
    name: IndemniteDepartStepName.ContratTravail,
    Component: StepContratTravail,
  },
  {
    label: "Convention collective",
    name: IndemniteDepartStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: IndemniteDepartStepName.Informations,
    Component: StepInformations,
  },
  {
    label: "Ancienneté",
    name: IndemniteDepartStepName.Anciennete,
    Component: StepAnciennete,
  },
  {
    label: "Salaires",
    name: IndemniteDepartStepName.Salaires,
    Component: StepSalaires,
  },
  {
    label: "Indemnité",
    name: IndemniteDepartStepName.Resultat,
    Component: StepResultat,
  },
];

export const CalculateurIndemniteLicenciement = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  return (
    <CalculateurIndemnite
      icon={icon}
      title={title}
      displayTitle={displayTitle}
      tool={IndemniteDepartType.INDEMNITE_LICENCIEMENT}
      steps={steps}
    />
  );
};
