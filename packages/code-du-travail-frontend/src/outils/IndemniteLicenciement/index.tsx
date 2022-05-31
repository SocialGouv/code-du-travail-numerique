import React from "react";
import { IndemniteLicenciementFormState } from "./form";
import { steps } from "./steps";
import { DebugInfo } from "./components";
import { useIndemniteLicenciementStore } from "./state";
import { Simulator } from "../Simulator";
import { StepName } from "./steps";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
};

export const CalculateurIndemnite = ({
  title,
  icon,
  displayTitle,
}: Props): JSX.Element => {
  const { onChange, onStepChange } = useIndemniteLicenciementStore((state) => ({
    onChange: state.onFormValuesChange,
    onStepChange: state.onStepChange,
  }));

  return (
    <Simulator<IndemniteLicenciementFormState, StepName>
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 à 10 min"
      debug={<DebugInfo />}
      onFormValuesChange={onChange}
      onStepChange={onStepChange}
      steps={steps}
    />
  );
};
