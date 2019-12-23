import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { icons, theme } from "@socialgouv/react-ui";
import { StepList, STEP_LIST_WIDTH } from "./StepList";
import { PrevNextBar } from "./PrevNextBar";
import { matopush } from "../../piwik";

const anchorRef = React.createRef();

function Wizard({
  initialState,
  initialValues = {},
  title,
  icon,
  Rules = null,
  stepReducer = step => step
}) {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  const { stepIndex, steps } = state;

  const setStepIndex = index =>
    dispatch({ type: "setStepIndex", payload: index });

  useEffect(() => {
    const node = anchorRef.current;
    if (node) {
      node.scrollIntoView();
      node.focus();
    }
  });

  const prevStep = values => {
    let nextStepIndex = stepIndex;
    let skipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.max(0, nextStepIndex - 1);
      skipFn = steps[nextStepIndex].skip || (() => false);
    }
    setStepIndex(nextStepIndex);

    matopush([
      "trackEvent",
      `outil_${title}`,
      "click_previous",
      initialState.steps[nextStepIndex + 1].label
    ]);
  };
  const nextStep = values => {
    let nextStepIndex = stepIndex;
    let skipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.min(nextStepIndex + 1, steps.length - 1);
      skipFn = steps[nextStepIndex].skip || (() => false);
    }
    setStepIndex(nextStepIndex);

    matopush([
      "trackEvent",
      `outil_${title}`,
      "view_step",
      initialState.steps[nextStepIndex].label
    ]);
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
      nextStep(form.getState().values);
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
              <StepList
                activeIndex={stepIndex}
                items={stepItems}
                anchorRef={anchorRef}
              />
              <Step form={form} dispatch={dispatch} />

              <PrevNextBar
                hasError={invalid && submitFailed}
                onPrev={() => prevStep(form.getState().values)}
                nextVisible={nextVisible}
                printVisible={printVisible}
                previousVisible={previousVisible}
              />
              {stepIndex > 0 && stepIndex < steps.length && (
                <Notice>
                  <Mandatory>*</Mandatory> Champs obligatoire
                </Notice>
              )}
              {process.env.NODE_ENV !== "production" &&
                process.env.NODE_ENV !== "test" && (
                  <details>
                    <summary>state</summary>
                    <pre>{JSON.stringify(form.getState().values, 0, 2)}</pre>
                  </details>
                )}
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
  initialState: PropTypes.shape({
    stepIndex: PropTypes.number,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  initialValues: PropTypes.object,
  Rules: PropTypes.func,
  title: PropTypes.string.isRequired
};

export { Wizard };

const { breakpoints, box, spacings } = theme;

const StyledForm = styled.form`
  padding: 0 0 0 ${STEP_LIST_WIDTH};
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;

const ToolTitle = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: ${spacings.larger};
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

const Notice = styled.p`
  padding-top: ${spacings.medium};
  border-top: ${({ theme }) => box.border(theme.border)};
`;

const Mandatory = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;
