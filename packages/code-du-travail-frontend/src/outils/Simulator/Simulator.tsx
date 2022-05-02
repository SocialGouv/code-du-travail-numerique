import React, { useEffect, useMemo } from "react";
import { SimulatorDecorator } from "../Components";
import { printResult } from "../common/utils";
import { Step, useSimulatorStore } from "./useSimulatorStore";
import { matopush } from "../../piwik";

type Props<FormState, StepName extends string> = {
  duration?: string;
  icon?: string;
  title: string;
  steps: Step<StepName>[];
  debug: JSX.Element;
  onFormValuesChange: (values: FormState) => void;
  onFinishStep: (step: Step<StepName>) => void;
};

const anchorRef = React.createRef<HTMLLIElement>();

const Simulator = <FormState, StepName extends string>({
  icon,
  title,
  duration,
  steps,
  debug,
  onFormValuesChange,
  onFinishStep,
}: Props<FormState, StepName>): JSX.Element => {
  const { currentStepIndex, previousStep, nextStep } = useSimulatorStore(
    (state) => state
  );

  const currentStep = steps[currentStepIndex];
  const Component = currentStep.Component;

  useEffect(() => {
    const node = anchorRef.current;
    // We only focus on wizard after wizard start
    // that way focus is correctly placed on the form
    if (node && currentStepIndex > 0) {
      node.focus();
    }
    if (window) {
      window.scrollTo(0, 0);
    }
  });

  const stepItems = useMemo(
    () =>
      steps.map(({ name, label }) => ({
        isValid: false,
        label,
        name,
      })),
    [steps]
  );

  const onNextStep = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= steps.length) {
      throw Error("Can't show the next step with index more than steps");
    } else {
      nextStep();
      onFinishStep(currentStep);
      matopush([
        "trackEvent",
        "outil",
        `view_step_${title}`,
        steps[nextStepIndex].name,
      ]);
    }
  };

  const prevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex >= 0) {
      previousStep();
      matopush([
        "trackEvent",
        "outil",
        `click_previous_${title}`,
        steps[previousStepIndex].name,
      ]);
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  return (
    <SimulatorDecorator<FormState>
      title={{
        icon,
        title,
        duration,
        hasNoMarginBottom: currentStep.options?.hasNoMarginBottom,
      }}
      navigation={{
        showNext: currentStepIndex < steps.length - 1,
        onPrevious: currentStepIndex > 0 ? prevStep : undefined,
        onPrint:
          currentStepIndex == steps.length - 1
            ? () => printResult(title)
            : undefined,
      }}
      steps={{
        steps: stepItems,
        activeIndex: currentStepIndex,
        listRef: anchorRef,
      }}
      onFormStepSubmit={onNextStep}
      onFormStateUpdate={onFormValuesChange}
      renderStep={Component}
      options={{
        debug: debug,
        annotations: currentStep.options?.annotation,
      }}
    />
  );
};

export default Simulator;
