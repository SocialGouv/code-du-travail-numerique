import React, { useMemo } from "react";
import { SimulatorDecorator } from "../Components";
import { printResult } from "../common/utils";
import { Step, useSimulatorStore } from "./useSimulatorStore";
import { matopush } from "../../piwik";

type Props<FormState, StepName extends string> = {
  duration?: string;
  icon?: string;
  title: string;
  displayTitle: string;
  steps: Step<StepName>[];
  debug: JSX.Element;
  onFormValuesChange: (values: FormState) => void;
  onStepChange: (oldStep: Step<StepName>, newStep: Step<StepName>) => void;
};

const Simulator = <FormState, StepName extends string>({
  icon,
  title,
  displayTitle,
  duration,
  steps,
  debug,
  onFormValuesChange,
  onStepChange,
}: Props<FormState, StepName>): JSX.Element => {
  const { currentStepIndex, previousStep, nextStep } = useSimulatorStore(
    (state) => state
  );

  const currentStep = steps[currentStepIndex];
  const Component = currentStep.Component;

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
      onStepChange(currentStep, steps[nextStepIndex]);
      matopush([
        "trackEvent",
        "outil",
        `view_step_${title}`,
        steps[nextStepIndex].name,
      ]);
      window?.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex >= 0) {
      previousStep();
      onStepChange(currentStep, steps[previousStepIndex]);
      matopush([
        "trackEvent",
        "outil",
        `click_previous_${title}`,
        steps[previousStepIndex].name,
      ]);
      window?.scrollTo(0, 0);
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  return (
    <SimulatorDecorator<FormState>
      title={{
        icon,
        title: displayTitle,
        duration: currentStepIndex === 0 ? duration : undefined,
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
      }}
      onFormStepSubmit={onNextStep}
      onFormStateUpdate={onFormValuesChange}
      renderStep={() => <Component />}
      formOptions={{
        legend: currentStep.options?.isForm ? currentStep.label : undefined,
      }}
      options={{
        debug: debug,
        annotations: currentStep.options?.annotation,
      }}
    />
  );
};

export default Simulator;
