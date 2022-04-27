import React, { useMemo } from "react";
import { SimulatorDecorator } from "../index";
import { printResult } from "../../common/utils";
import { Step, useSimulatorStore } from "./state/useSimulatorStore";

type Props<FormState> = {
  duration?: string;
  icon?: string;
  title: string;
  steps: Step[];
  debug: JSX.Element;
  onFormValuesChange: (values: FormState) => void;
};

const Simulator = <FormState,>({
  icon,
  title,
  duration,
  steps,
  debug,
  onFormValuesChange,
}: Props<FormState>): JSX.Element => {
  const { currentStepIndex, previousStep, nextStep, reset } = useSimulatorStore(
    (state) => state
  );

  const stepItems = useMemo(
    () =>
      steps.map(({ name, label }) => ({
        isValid: false,
        label,
        name,
      })),
    [steps]
  );

  const handlePageSubmit = () => {
    // This means the user clicked on a "restart a new simulation" button
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= steps.length) {
      reset();
    } else {
      nextStep();
    }
  };

  const prevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex >= 0) {
      previousStep();
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const Component = steps[currentStepIndex].Component;

  return (
    <SimulatorDecorator<FormState>
      title={{
        icon,
        title,
        duration,
        hasNoMarginBottom: false, // TODO steps[stepIndex].hasNoMarginBottom,
      }}
      navigation={{
        showNext: currentStepIndex < steps.length,
        onPrevious: currentStepIndex > 0 ? prevStep : undefined,
        onPrint:
          currentStepIndex == steps.length - 1
            ? () => printResult(title)
            : undefined,
      }}
      steps={{
        steps: stepItems,
        activeIndex: currentStepIndex,
        // TODO listRef: anchorRef,
      }}
      onFormStepSubmit={handlePageSubmit}
      onFormStateUpdate={onFormValuesChange}
      debug={debug}
      renderStep={() => <Component />}
    />
  );
};

export default Simulator;
