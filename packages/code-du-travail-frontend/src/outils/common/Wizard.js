import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { PageTitle, theme } from "@socialgouv/react-ui";

import { StepItems } from "./StepItems";
import { PrevNextBar } from "./PrevNextBar";

function Wizard({
  initialSteps,
  initialStepIndex = 0,
  initialValues = {},
  title,
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
  const printVisible = stepIndex === steps.length - 1;

  const validate = values => {
    const Step = steps[stepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = (values, form) => {
    // This means the user clicked on a "restart a new simulation" button
    if (stepIndex === steps.length - 1) {
      dispatch({
        type: "reset"
      });
      setStepIndex(0);
      setTimeout(() => form.reset());
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
    <Form
      initialValues={initialValues}
      validate={validate}
      decorators={decorators}
      mutators={{
        ...arrayMutators
      }}
      onSubmit={handlePageSubmit}
    >
      {({ handleSubmit, form, invalid, submitFailed }) => {
        return (
          <>
            <StyledForm onSubmit={handleSubmit}>
              {Rules && (
                <Rules values={form.getState().values} dispatch={dispatch} />
              )}
              <StepItems activeIndex={stepIndex} items={stepItems} />
              <Column>
                <ToolTitle>{title}</ToolTitle>
                <StepWrapper noPadding>
                  <Step form={form} dispatch={dispatch} />
                </StepWrapper>
                <PrevNextBar
                  hasError={invalid && submitFailed}
                  onPrev={prevStep}
                  nextVisible={nextVisible}
                  printVisible={printVisible}
                  previousVisible={previousVisible}
                />
              </Column>
            </StyledForm>
          </>
        );
      }}
    </Form>
  );
}

Wizard.propTypes = {
  title: PropTypes.string.isRequired,
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

const { box, spacings, breakpoints } = theme;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 0;
  overflow: auto;
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.white};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
  @media print {
    border: 0;
  }
`;

const StepWrapper = styled.div`
  flex-basis: 240px;
  margin: ${spacings.large} 0;
`;
const ToolTitle = styled(PageTitle)`
  padding: ${spacings.base} 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;
const Column = styled.div`
  flex: 1;
  padding: ${spacings.medium} ${spacings.larger};
`;
