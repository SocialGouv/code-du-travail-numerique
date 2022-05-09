import arrayMutators from "final-form-arrays";
import React, { Reducer, useEffect, useReducer } from "react";

import { push as matopush } from "@socialgouv/matomo-next";
import {
  Action,
  ActionName,
  FormContent,
  SkipFn,
  State,
} from "./type/WizardType";
import { printResult } from "./utils/";
import { SimulatorDecorator } from "../Components";
import DebugInfo from "./DebugInfo";

const anchorRef = React.createRef<HTMLLIElement>();

type Props = {
  Rules?: any;
  duration?: string;
  icon?: string;
  initialState: State;
  initialValues?: any;
  stepReducer?: any;
  title: string;
  displayTitle: string;
};

export const Wizard = ({
  initialState,
  initialValues = {},
  title,
  displayTitle,
  icon,
  Rules = null,
  stepReducer = (step) => step,
  duration,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    stepReducer,
    initialState
  );
  const { stepIndex, steps } = state;
  const setStepIndex = (index) =>
    dispatch({ payload: index, type: ActionName.setStepIndex });

  useEffect(() => {
    const node = anchorRef.current;
    // We only focus on wizard after wizard start
    // that way focus is correctly placed on the form
    if (node && stepIndex > 0) {
      node.focus();
    }
  });

  const prevStep = (values) => {
    let nextStepIndex: number = stepIndex;
    let skipFn: SkipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.max(0, nextStepIndex - 1);
      skipFn = steps[nextStepIndex].skip ?? (() => false);
    }
    setStepIndex(nextStepIndex);

    matopush([
      "trackEvent",
      "outil",
      `click_previous_${title}`,
      state.steps[nextStepIndex].name,
    ]);
    window?.scrollTo(0, 0);
  };
  const nextStep = (values) => {
    let nextStepIndex = stepIndex;
    const currentStep = steps[stepIndex];
    if (currentStep.onStepDone) {
      currentStep.onStepDone(title, values);
    }
    let skipFn: SkipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.min(nextStepIndex + 1, steps.length - 1);
      skipFn = steps[nextStepIndex].skip ?? (() => false);
    }
    setStepIndex(nextStepIndex);
    matopush([
      "trackEvent",
      "outil",
      `view_step_${title}`,
      state.steps[nextStepIndex].name,
    ]);
    window?.scrollTo(0, 0);
  };

  const previousVisible = stepIndex > 0;
  const nextVisible = stepIndex < steps.length - 1;
  const isLastStep = stepIndex === steps.length - 1;

  const validate = (values) => {
    const Step: any = steps[stepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = (values, form) => {
    // This means the user clicked on a "restart a new simulation" button
    if (stepIndex === steps.length - 1) {
      dispatch({
        type: ActionName.reset,
      });
      setStepIndex(0);
      setTimeout(() => form.reset());
    } else {
      nextStep(form.getState().values);
    }
  };
  const stepItems = steps.map(({ name, label }) => ({
    isValid: false,
    label,
    name,
  }));

  const decorators = steps
    .map((step) => (step.component as any).decorator)
    .filter(Boolean);

  const Step = steps[stepIndex].component;

  const StepProps = steps[stepIndex].componentProps;

  const Annotation = steps[stepIndex].annotation;

  return (
    <>
      <SimulatorDecorator<FormContent>
        initialValues={initialValues}
        title={{
          icon,
          title: displayTitle,
          duration: stepIndex === 0 ? duration : undefined,
          hasNoMarginBottom: steps[stepIndex].hasNoMarginBottom,
        }}
        navigation={{
          showNext: nextVisible,
          onPrevious: previousVisible
            ? (values) => prevStep(values)
            : undefined,
          onPrint: isLastStep ? () => printResult(title) : undefined,
        }}
        steps={{
          steps: stepItems,
          activeIndex: stepIndex,
          listRef: anchorRef,
        }}
        onFormStepSubmit={handlePageSubmit}
        options={{
          debug: <DebugInfo />,
          annotations: Annotation,
        }}
        formOptions={{
          validate: validate,
          decorators: decorators,
          mutators: {
            ...arrayMutators,
          },
          legend: steps[stepIndex].isForm ? steps[stepIndex].label : undefined,
        }}
        renderStep={(form) => {
          return (
            <>
              {Rules && (
                <Rules values={form.getState().values} dispatch={dispatch} />
              )}
              <Step
                form={form}
                dispatch={dispatch}
                title={title}
                {...StepProps}
              />
            </>
          );
        }}
      />
    </>
  );
};
