import React from "react";
import { DebugInfo } from "./components";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./state";
import { Step } from "../Simulator";
import { StepIntro, StepContratTravail } from "./steps";
import { useContratTravailStore } from "./store";
import SimulatorLayout from "./common/Layout";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
};

export enum StepName {
  Introduction = "Introduction",
  Info = "Contrat de travail",
}

const steps: Step<StepName>[] = [
  {
    label: StepName.Introduction,
    name: StepName.Introduction,
    Component: StepIntro,
  },
  {
    label: StepName.Info,
    name: StepName.Info,
    Component: StepContratTravail,
  },
  {
    label: StepName.Introduction,
    name: StepName.Introduction,
    Component: StepIntro,
  },
];

const IndemniteLicenciementSimulator = ({
  title,
  icon,
  displayTitle,
}: Omit<Props, "publicodesRules">): JSX.Element => {
  const { onChange, onStepChange } = useIndemniteLicenciementStore((state) => ({
    onChange: state.onFormValuesChange,
    onStepChange: state.onStepChange,
  }));

  const { onValidateStepInfo, hasErrorStepInfo } = useContratTravailStore(
    (state) => ({
      onValidateStepInfo: state.onValidateStep,
      hasErrorStepInfo: state.hasError,
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
      createStore={() =>
        createIndemniteLicenciementStore(publicodesRules, title)
      }
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
