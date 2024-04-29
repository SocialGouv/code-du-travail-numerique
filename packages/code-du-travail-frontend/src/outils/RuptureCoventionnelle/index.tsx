import React from "react";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../CommonIndemniteDepart";
import { IndemniteDepartType } from "../types";
import { Step } from "../Simulator";
import {
  StepAgreement,
  StepInformations,
  StepSalaires,
} from "../CommonIndemniteDepart/steps";
import {
  StepResultat,
  StepIntro,
  StepContratTravail,
  StepAnciennete,
} from "./steps";
import { useRuptureCoEventEmitter } from "./events/useRuptureCoEventEmitter";

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
    Component: () => (
      <StepSalaires type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE} />
    ),
  },
  {
    label: "Indemnité",
    name: IndemniteDepartStepName.Resultat,
    Component: StepResultat,
  },
];

export const CalculateurRuptureConventionnelle = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  useRuptureCoEventEmitter();
  return (
    <CalculateurIndemnite
      icon={icon}
      title={title}
      displayTitle={displayTitle}
      tool={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
      steps={steps}
      hasFeedbackPopup={false}
    />
  );
};
