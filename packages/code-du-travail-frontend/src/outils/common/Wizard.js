import { icons, theme, Wrapper } from "@socialgouv/cdtn-ui";
import arrayMutators from "final-form-arrays";
import PropTypes from "prop-types";
import React, { useEffect, useReducer } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

import { matopush } from "../../piwik";
import { PrevNextBar } from "./PrevNextBar";
import { STEP_LIST_WIDTH, StepList } from "./StepList";
import { MatomoCommonEvent, MatomoPreavisRetraiteEvent } from "./type/matomo";

const anchorRef = React.createRef();

function Wizard({
  initialState,
  initialValues = {},
  title,
  icon,
  Rules = null,
  stepReducer = (step) => step,
}) {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  const { stepIndex, steps } = state;

  const setStepIndex = (index) =>
    dispatch({ payload: index, type: "setStepIndex" });

  useEffect(() => {
    const node = anchorRef.current;
    // We only focus on wizzard after wizzard start
    // that way focus is correctly placed on the form
    if (node && stepIndex > 0) {
      node.focus();
    }
    if (window) {
      window.scrollTo(0, 0);
    }
  });

  const prevStep = (values) => {
    let nextStepIndex = stepIndex;
    let skipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.max(0, nextStepIndex - 1);
      skipFn = steps[nextStepIndex].skip || (() => false);
    }
    setStepIndex(nextStepIndex);

    matopush([
      "trackEvent",
      "outil",
      `click_previous_${title}`,
      state.steps[nextStepIndex].name,
    ]);
  };
  const nextStep = (values) => {
    let nextStepIndex = stepIndex;
    let skipFn = () => true;
    while (skipFn(values)) {
      nextStepIndex = Math.min(nextStepIndex + 1, steps.length - 1);
      skipFn = steps[nextStepIndex].skip || (() => false);
    }
    setStepIndex(nextStepIndex);
    matopush([
      "trackEvent",
      "outil",
      `view_step_${title}`,
      state.steps[nextStepIndex].name,
    ]);
  };

  const previousVisible = stepIndex > 0;
  const nextVisible = stepIndex < steps.length - 1;
  const isLastStep = stepIndex === steps.length - 1;

  const validate = (values) => {
    const Step = steps[stepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = (values, form) => {
    // This means the user clicked on a "restart a new simulation" button
    if (stepIndex === steps.length - 1) {
      dispatch({
        type: "reset",
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
    .map((step) => step.component.decorator)
    .filter(Boolean);

  const Step = steps[stepIndex].component;

  const Annotation = steps[stepIndex].annotation;

  const onClickNext = (form) => {
    switch (steps[stepIndex].name) {
      case initialState.steps[1].name: // "origine"
        matopush([
          MatomoCommonEvent.TRACK_EVENT,
          MatomoCommonEvent.OUTIL,
          form.getState().values["contrat salarié - mise à la retraite"] ===
          "oui"
            ? MatomoPreavisRetraiteEvent.MISE_RETRAITE
            : MatomoPreavisRetraiteEvent.DEPART_RETRAITE,
        ]);
        break;
      case initialState.steps[4].name: // "anciennete"
        matopush([
          MatomoCommonEvent.TRACK_EVENT,
          MatomoCommonEvent.OUTIL,
          form.getState().values.seniorityGreaterThanTwoYears
            ? MatomoPreavisRetraiteEvent.ANCIENNETE_PLUS_2_ANS
            : MatomoPreavisRetraiteEvent.ANCIENNETE_MOINS_2_ANS,
        ]);
        break;
      default:
        return;
    }
  };

  return (
    <Wrapper variant="main">
      <Form
        initialValues={initialValues}
        validate={validate}
        decorators={decorators}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={handlePageSubmit}
      >
        {({ handleSubmit, form, invalid, submitFailed }) => {
          return (
            <>
              <StyledForm
                onSubmit={() => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                {Rules && (
                  <Rules values={form.getState().values} dispatch={dispatch} />
                )}
                <WizardTitle title={title} icon={icon} />
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
                  printVisible={isLastStep}
                  previousVisible={previousVisible}
                  onNext={() => onClickNext(form)}
                />

                {Annotation && (
                  <p>
                    <Annotation />
                  </p>
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
    </Wrapper>
  );
}

Wizard.propTypes = {
  Rules: PropTypes.func,
  icon: PropTypes.string,
  initialState: PropTypes.shape({
    stepIndex: PropTypes.number,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  initialValues: PropTypes.object,
  stepReducer: PropTypes.func,
  title: PropTypes.string.isRequired,
};

function WizardTitle({ title, icon }) {
  const Icon = icons[icon];
  return (
    <ToolTitle>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      {title}
    </ToolTitle>
  );
}

export { Wizard, WizardTitle };

const { breakpoints, spacings } = theme;

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
    margin-bottom: ${spacings.base};
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
