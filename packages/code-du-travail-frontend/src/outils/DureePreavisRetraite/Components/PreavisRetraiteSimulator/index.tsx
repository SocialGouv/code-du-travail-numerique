import { DebugInfo } from "../index";
import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import { Simulator } from "../../../Simulator";
import { StepName } from "../../steps";
import { PreavisRetraiteFormState } from "../../form";
import { steps } from "./steps";

const PreavisRetraiteSimulator = ({
  title,
  icon,
}: {
  icon: string;
  title: string;
}): JSX.Element => {
  const { onChange, onStepChange } = usePreavisRetraiteStore((state) => ({
    onChange: state.onFormValuesChange,
    onStepChange: state.onStepChange,
  }));

  return (
    <Simulator<PreavisRetraiteFormState, StepName>
      title={title}
      icon={icon}
      duration="5 min"
      debug={<DebugInfo />}
      onFormValuesChange={onChange}
      onStepChange={onStepChange}
      steps={steps}
    />
  );
};

export default PreavisRetraiteSimulator;
