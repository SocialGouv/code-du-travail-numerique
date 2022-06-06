import React from "react";
import { Step } from "../Simulator";
import { StepIntro, StepContratTravail } from "./steps";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";
import SimulatorLayout from "./common/Layout";
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
    label: "Introduction",
    name: IndemniteLicenciementStepName.Introduction,
    Component: StepIntro,
  },
];

const IndemniteLicenciementSimulator = ({
  title,
  icon,
  displayTitle,
}: Omit<Props, "publicodesRules">): JSX.Element => {
  const { onValidateStepInfo, isStepInfoValid } = useIndemniteLicenciementStore(
    (state) => ({
      onValidateStepInfo: state.onValidateStep,
      isStepInfoValid: state.isStepValid,
    })
  );

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
