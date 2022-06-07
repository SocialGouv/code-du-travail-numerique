import React from "react";
import { Step } from "../Simulator";
import {
  StepIntro,
  StepContratTravail,
  StepAnciennete,
  StepSalaires,
  StepResultat,
} from "./steps";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";
import SimulatorLayout from "./components/Layout";
import { DebugInfo } from "./utils";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
};

export enum IndemniteLicenciementStepName {
  Introduction = "Intro",
  Info = "Info",
  Anciennete = "Anciennete",
  Salaires = "Salaires",
  Resultat = "Resultat",
}

const steps: Step<IndemniteLicenciementStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteLicenciementStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Contrat de travail",
    name: IndemniteLicenciementStepName.Info,
    Component: StepContratTravail,
  },
  {
    label: "Ancienneté",
    name: IndemniteLicenciementStepName.Anciennete,
    Component: StepAnciennete,
  },
  {
    label: "Salaires",
    name: IndemniteLicenciementStepName.Salaires,
    Component: StepSalaires,
  },
  {
    label: "Indemnité légale",
    name: IndemniteLicenciementStepName.Resultat,
    Component: StepResultat,
  },
];

const IndemniteLicenciementSimulator = ({
  title,
  icon,
  displayTitle,
}: Omit<Props, "publicodesRules">): JSX.Element => {
  const {
    onValidateStepInfo,
    isStepInfoValid,
    onValidateStepAnciennete,
    isStepAncienneteValid,
    onValidateStepSalaires,
    isStepSalairesValid,
  } = useIndemniteLicenciementStore((state) => ({
    ...state,
  }));

  return (
    <SimulatorLayout
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 à 10 min"
      debug={<DebugInfo />}
      steps={steps}
      validators={[
        {
          stepName: IndemniteLicenciementStepName.Info,
          isStepValid: isStepInfoValid,
          validator: onValidateStepInfo,
        },
        {
          stepName: IndemniteLicenciementStepName.Anciennete,
          isStepValid: isStepAncienneteValid,
          validator: onValidateStepAnciennete,
        },
        {
          stepName: IndemniteLicenciementStepName.Salaires,
          isStepValid: isStepSalairesValid,
          validator: onValidateStepSalaires,
        },
      ]}
    />
  );
};

export const CalculateurIndemnite = ({
  icon,
  title,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element => {
  return (
    <IndemniteLicenciementProvider
      createStore={() => createIndemniteLicenciementStore(publicodesRules)}
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
