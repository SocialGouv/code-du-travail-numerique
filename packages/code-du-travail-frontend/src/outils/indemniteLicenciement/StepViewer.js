import React from "react";
import { StepItems } from "./StepItems";
import { PrevNextBar } from "./PrevNextBar";

function StepViewer({ state, dispatch }) {
  const { steps, currentStep } = state;
  const Step = steps.find(step => step.name === currentStep);
  const prevStep = () => {
    dispatch({ type: "previous" });
  };
  const nextStep = () => {
    dispatch({ type: "next" });
  };

  const previousVisible =
    state.steps.findIndex(step => state.currentStep === step.name) > 0;

  const nextVisible =
    state.steps.findIndex(step => state.currentStep === step.name) <
    state.steps.length - 1;

  const errors = Step.component.validate(state, currentStep);
  const hasError = Object.keys(errors).length > 0;

  return (
    <>
      <StepItems current={state.currentStep} steps={state.stepItems} />
      <Step.component
        name={Step.name}
        errors={errors}
        state={state}
        dispatch={dispatch}
      />
      <PrevNextBar
        disabled={hasError}
        onNext={nextStep}
        onPrev={prevStep}
        nextVisible={nextVisible}
        previousVisible={previousVisible}
      />
    </>
  );
}

export { StepViewer };
