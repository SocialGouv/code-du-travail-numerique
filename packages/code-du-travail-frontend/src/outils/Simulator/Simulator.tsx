import React, { useEffect, useMemo } from "react";
import { SimulatorDecorator } from "../Components";
import { printResult } from "../common/utils";
import { createSimulatorStore } from "./useSimulatorStore";
import { push as matopush } from "@socialgouv/matomo-next";
import { SimulatorStepProvider, useSimulatorStepStore } from "./createContext";
import { Step } from "./type";

const anchorRef = React.createRef<HTMLLIElement>();
import arrayMutators from "final-form-arrays";

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

const SimulatorContent = <FormState, StepName extends string>({
  icon,
  title,
  displayTitle,
  duration,
  steps,
  debug,
  onFormValuesChange,
  onStepChange,
}: Props<FormState, StepName>): JSX.Element => {
  const { currentStepIndex, previousStep, nextStep } = useSimulatorStepStore(
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

  useEffect(() => {
    const node = anchorRef.current;
    // We only focus on wizard after wizard start
    // that way focus is correctly placed on the form
    if (node && currentStepIndex > 0) {
      node.focus();
    }
  }, [currentStepIndex]);

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

  const validate = (values) => {
    const Step: any = currentStep.Component;
    return Step.validate ? Step.validate(values) : {};
  };
  const decorators = steps
    .map((step) => (step.Component as any).decorator)
    .filter(Boolean);

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
        listRef: anchorRef,
      }}
      onFormStepSubmit={onNextStep}
      onFormStateUpdate={onFormValuesChange}
      renderStep={() => <Component />}
      options={{
        debug: debug,
        annotations: currentStep.options?.annotation,
      }}
      formOptions={{
        validate: validate,
        decorators: decorators,
        mutators: {
          ...arrayMutators,
        },
        legend: currentStep.options?.isForm ? currentStep.label : undefined,
      }}
    />
  );
};

const Simulator = <FormState, StepName extends string>(
  props: Props<FormState, StepName>
): JSX.Element => {
  return (
    <SimulatorStepProvider createStore={() => createSimulatorStore()}>
      <SimulatorContent {...props} />
    </SimulatorStepProvider>
  );
};

export default Simulator;
