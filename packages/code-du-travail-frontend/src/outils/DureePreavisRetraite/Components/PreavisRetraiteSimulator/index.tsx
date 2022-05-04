import { DebugInfo } from "../index";
import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import { Simulator } from "../../../Simulator";
import { StepName } from "../../steps";
import { PreavisRetraiteFormState } from "../../form";
import { steps } from "./steps";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};
const PreavisRetraiteSimulator = ({
  title,
  icon,
  displayTitle,
}: Props): JSX.Element => {
  const { onChange, onStepChange } = usePreavisRetraiteStore((state) => ({
    onChange: state.onFormValuesChange,
    onStepChange: state.onStepChange,
  }));

  return (
    <Simulator<PreavisRetraiteFormState, StepName>
      title={title}
      displayTitle={displayTitle}
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
