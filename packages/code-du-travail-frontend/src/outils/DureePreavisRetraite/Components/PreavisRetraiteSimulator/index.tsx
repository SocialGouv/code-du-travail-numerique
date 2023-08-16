import { DebugInfo } from "../index";
import React, { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../../state";
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
  const store = useContext(PreavisRetraiteContext);
  const { onChange, onStepChange, errorPublicodes } = usePreavisRetraiteStore(
    store,
    (state) => ({
      onChange: state.onFormValuesChange,
      onStepChange: state.onStepChange,
      errorPublicodes: state.errorPublicodes,
    })
  );

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
      hasErrorPublicodes={errorPublicodes}
    />
  );
};

export default PreavisRetraiteSimulator;
