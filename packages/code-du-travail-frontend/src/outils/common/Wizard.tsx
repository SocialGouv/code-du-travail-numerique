import { Fieldset, icons, Legend, theme, Wrapper } from "@socialgouv/cdtn-ui";
import arrayMutators from "final-form-arrays";
import { useRouter } from "next/router";
import React, { Reducer, useEffect, useReducer } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

import {
  MatomoBaseEvent,
  MatomoRetirementEvent,
  MatomoTrackUrl,
} from "../../lib/matomo";
import { matopush } from "../../piwik";
import { PrevNextBar } from "./PrevNextBar";
import { STEP_LIST_WIDTH, StepList } from "./StepList";
import { Action, ActionName, SkipFn, State } from "./type/WizardType";

const anchorRef = React.createRef<HTMLLIElement>();

type Props = {
  Rules?: any;
  duration?: string;
  icon?: string;
  initialState: State;
  initialValues?: any;
  stepReducer?: any;
  title: string;
};

function Wizard({
  initialState,
  initialValues = {},
  title,
  icon,
  Rules = null,
  stepReducer = (step) => step,
  duration,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    stepReducer,
    initialState
  );
  const { stepIndex, steps } = state;
  const router = useRouter();
  const setStepIndex = (index) =>
    dispatch({ payload: index, type: ActionName.setStepIndex });

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
  };
  const nextStep = (values) => {
    let nextStepIndex = stepIndex;
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

  const onClickNext = (form) => {
    if (router.asPath === MatomoTrackUrl.PREAVIS_RETRAITE) {
      switch (steps[stepIndex].name) {
        case initialState.steps[1].name: // "origine"
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.OUTIL,
            form.getState().values["contrat salarié - mise à la retraite"] ===
            "oui"
              ? MatomoRetirementEvent.MISE_RETRAITE
              : MatomoRetirementEvent.DEPART_RETRAITE,
          ]);
          break;
        case initialState.steps[4].name: // "anciennete"
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.OUTIL,
            form.getState().values.seniorityGreaterThanTwoYears
              ? MatomoRetirementEvent.ANCIENNETE_PLUS_2_ANS
              : MatomoRetirementEvent.ANCIENNETE_MOINS_2_ANS,
          ]);
          break;
        default:
          return;
      }
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
              <StyledForm onSubmit={handleSubmit}>
                {Rules && (
                  <Rules values={form.getState().values} dispatch={dispatch} />
                )}
                <WizardTitle
                  title={title}
                  icon={icon}
                  duration={duration}
                  stepIndex={stepIndex}
                  hasNoMarginBottom={steps[stepIndex].hasNoMarginBottom}
                />
                <StepList
                  activeIndex={stepIndex}
                  items={stepItems}
                  anchorRef={anchorRef}
                />
                {steps[stepIndex].isForm ? (
                  <Fieldset>
                    <Legend isHidden>{steps[stepIndex].label}</Legend>
                    <Step form={form} dispatch={dispatch} {...StepProps} />
                  </Fieldset>
                ) : (
                  <Step form={form} dispatch={dispatch} {...StepProps} />
                )}
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
                      <pre>
                        {JSON.stringify(form.getState().values, null, 2)}
                      </pre>
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

type WizardTitleProps = {
  duration?: string;
  hasNoMarginBottom?: boolean;
  icon?: string;
  stepIndex?: number;
  title: string;
};

function WizardTitle({
  title,
  icon,
  duration,
  stepIndex,
  hasNoMarginBottom,
}: WizardTitleProps): JSX.Element {
  const Icon = icons[icon];
  return (
    <ToolTitle hasNoMarginBottom={hasNoMarginBottom}>
      <StyledTitleBox>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleBox>
      {duration && stepIndex === 0 && <WizardDuration duration={duration} />}
    </ToolTitle>
  );
}

function WizardDuration({ duration }) {
  return (
    <ToolDuration>
      <TimeWithLabel aria-hidden="true" />
      <ToolDurationLabel>{duration}</ToolDurationLabel>
    </ToolDuration>
  );
}

export { Wizard, WizardTitle };

const { breakpoints, spacings, fonts } = theme;

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

const ToolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) =>
    props.hasNoMarginBottom ? "0px" : spacings.large};
  padding-bottom: ${spacings.base};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacings.base};
    padding: ${spacings.base} 0 ${spacings.small} 0;
    border-bottom: 0;
  }
`;

const ToolDuration = styled.div`
  position: relative;
  padding-right: 45px;
`;
const ToolDurationLabel = styled.span`
  position: absolute;
  bottom: 3px;
  left: 28px;
  font-size: ${fonts.sizes.tiny};
  color: ${({ theme }) => theme.paragraph};
`;
const TimeWithLabel = styled(icons.TimeWithLabel)`
  width: 4.2rem;
`;
const StyledTitle = styled.h1`
  margin: 0;
`;
const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.span`
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${spacings.base};
`;
