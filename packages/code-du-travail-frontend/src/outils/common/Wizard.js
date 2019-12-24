import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { icons, theme } from "@socialgouv/react-ui";

import { StepList, STEP_LIST_WIDTH } from "./StepList";
import { PrevNextBar } from "./PrevNextBar";

function Wizard({
  initialSteps,
  initialStepIndex = 0,
  initialValues = {},
  title,
  icon,
  Rules = null,
  stepReducer = step => step
}) {
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [steps, dispatch] = useReducer(stepReducer, initialSteps);

  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  });

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

  const Icon = icons[icon];

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
              <ToolTitle>
                {Icon && (
                  <IconWrapper>
                    <Icon />
                  </IconWrapper>
                )}
                {title}
              </ToolTitle>
              <StepList activeIndex={stepIndex} items={stepItems} />
              <StepWrapper>
                <Step form={form} dispatch={dispatch} />
              </StepWrapper>
              <PrevNextBar
                hasError={invalid && submitFailed}
                onPrev={prevStep}
                nextVisible={nextVisible}
                printVisible={printVisible}
                previousVisible={previousVisible}
              />
            </StyledForm>
          </>
        );
      }}
    </Form>
  );
}

Wizard.propTypes = {
  stepReducer: PropTypes.func,
  icon: PropTypes.string,
  initialSteps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  initialStepIndex: PropTypes.number,
  initialValues: PropTypes.object,
  Rules: PropTypes.func,
  title: PropTypes.string.isRequired
};

export { Wizard };

const { spacings, breakpoints } = theme;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 ${STEP_LIST_WIDTH};
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;

const StepWrapper = styled.div`
  margin: ${spacings.base} 0;
  @media (max-width: ${breakpoints.tablet}) {
    margin: ${spacings.small} 0 0 0;
  }
`;
const ToolTitle = styled.h1`
  display: flex;
  align-items: center;
  padding-bottom: ${spacings.base};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacings.base} 0 ${spacings.small} 0;
    border-bottom: 0;
  }
`;

const IconWrapper = styled.span`
  display: block;
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${spacings.base};
`;
