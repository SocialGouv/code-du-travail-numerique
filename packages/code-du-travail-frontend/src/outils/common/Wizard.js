import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { Container, theme } from "@cdt/ui";

import { StepItems } from "./StepItems";
import { PrevNextBar } from "./PrevNextBar";

function Wizard({
  initialSteps,
  initialStepIndex = 0,
  initialValues = {},
  Rules = null,
  stepReducer = step => step
}) {
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [steps, dispatch] = useReducer(stepReducer, initialSteps);

  const prevStep = () => {
    setStepIndex(Math.max(0, stepIndex - 1));
  };
  const nextStep = () => {
    setStepIndex(Math.min(stepIndex + 1, steps.length - 1));
  };

  const previousVisible = stepIndex > 0;
  const nextVisible = stepIndex < steps.length - 1;

  const validate = values => {
    const Step = steps[stepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = (values, form) => {
    // This means the user clicked on a "restart a new simulation" button
    if (stepIndex === steps.length - 1) {
      form.reset();
      dispatch({
        type: "reset"
      });
      setStepIndex(0);
    } else {
      nextStep();
    }
  };
  const stepItems = steps.map(({ name, label }) => ({
    name,
    label,
    isValid: false
  }));

  const decorators = steps
    .map(step => step.component.decorator)
    .filter(Boolean);

  const Step = steps[stepIndex].component;

  return (
    <>
      <Form
        initialValues={initialValues}
        validate={validate}
        decorators={decorators}
        mutators={{
          ...arrayMutators
        }}
        onSubmit={handlePageSubmit}
      >
        {({ handleSubmit, form, invalid }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                {Rules && (
                  <Rules values={form.getState().values} dispatch={dispatch} />
                )}
                <StepItems activeIndex={stepIndex} items={stepItems} />
                <StepWrapper narrow noPadding>
                  <Step form={form} dispatch={dispatch} />
                </StepWrapper>
                <PrevNextBar
                  onPrev={prevStep}
                  nextVisible={nextVisible}
                  disabled={invalid}
                  previousVisible={previousVisible}
                />
              </form>
            </>
          );
        }}
      </Form>
    </>
  );
}

Wizard.propTypes = {
  stepReducer: PropTypes.func,
  initialSteps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  initialStepIndex: PropTypes.number,
  initialValues: PropTypes.object,
  Rules: PropTypes.func
};

export { Wizard };

const { spacing } = theme;

const StepWrapper = styled(Container)`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.large};
`;
