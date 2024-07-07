import React from "react";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../CommonIndemniteDepart-dfr";
import { IndemniteDepartType } from "../types";
import { Step } from "../Simulator";
import {
  StepAgreement,
  StepInformations,
  StepSalaires,
} from "../CommonIndemniteDepart-dfr/steps";
import {
  StepAnciennete,
  StepContratTravail,
  StepIntro,
  StepResultat,
} from "./steps";
import { useIndemniteLicenciementEventEmitter } from "./events/useIndemniteLicenciementEventEmitter";

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
    Component: () => <StepSalaires type={IndemniteDepartType.LICENCIEMENT} />,
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
  useIndemniteLicenciementEventEmitter();
  return (
    <CalculateurIndemnite
      icon={icon}
      title={title}
      displayTitle={displayTitle}
      tool={IndemniteDepartType.LICENCIEMENT}
      steps={steps}
      hasFeedbackPopup={true}
    />
  );
};
