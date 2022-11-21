import { theme, Wrapper } from "@socialgouv/cdtn-ui";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { matopush } from "../../piwik";
import { printResult } from "../common/utils";
import { StepList, Title } from "./SimulatorDecorator/Components";
import { createSimulatorStore, Step } from "../Simulator";
import {
  SimulatorStepProvider,
  useSimulatorStepStore,
} from "../Simulator/createContext";
import SimulatorNavigation from "./SimulatorNavigation";

const { spacings } = theme;

type Validator<StepName extends string> = {
  validator: () => boolean;
  stepName: StepName;
  isStepValid: boolean;
};

type Props<StepName extends string> = {
  title: string;
  displayTitle: string;
  icon: string;
  duration: string;
  debug?: JSX.Element;
  steps: Step<StepName>[];
  validators: Validator<StepName>[];
  hiddenStep?: StepName[];
};

const SimulatorContent = <StepName extends string>({
  title,
  displayTitle,
  icon,
  duration,
  debug,
  steps,
  validators,
  hiddenStep,
}: Props<StepName>): JSX.Element => {
  const anchorRef = React.createRef<HTMLLIElement>();

  const { currentStepIndex, previousStep, nextStep } = useSimulatorStepStore(
    (state) => state
  );

  const visibleSteps = useMemo(
    () =>
      steps.filter((step) => !hiddenStep || !hiddenStep.includes(step.name)),
    [steps, hiddenStep]
  );

  const Step = visibleSteps[currentStepIndex].Component;

  const stepItems = useMemo(
    () =>
      visibleSteps.map(({ name, label }) => ({
        isValid: false,
        label,
        name,
      })),
    [visibleSteps]
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
    if (nextStepIndex >= visibleSteps.length) {
      throw Error("Can't show the next step with index more than steps");
    } else {
      let isValid: boolean | undefined;
      if (currentStepIndex === 0) {
        isValid = true;
      } else {
        isValid = validators
          .find(
            (validator) =>
              validator.stepName === visibleSteps[currentStepIndex].name
          )
          ?.validator();
      }
      if (isValid) {
        nextStep();
        matopush([
          "trackEvent",
          "outil",
          `view_step_${title}`,
          visibleSteps[nextStepIndex].name,
        ]);
        window?.scrollTo(0, 0);
      }
    }
  };

  const onPrevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex >= 0) {
      previousStep();
      matopush([
        "trackEvent",
        "outil",
        `click_previous_${title}`,
        visibleSteps[previousStepIndex].name,
      ]);
      window?.scrollTo(0, 0);
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  return (
    <StyledWrapper variant="main">
      <StyledForm>
        <StyledStepList
          activeIndex={currentStepIndex}
          steps={stepItems}
          width={STEP_LIST_WIDTH}
        />
        <StyledTitle
          title={displayTitle}
          duration={currentStepIndex === 0 ? duration : undefined}
          icon={icon}
          hasNoMarginBottom={
            visibleSteps[currentStepIndex].options?.hasNoMarginBottom
          }
        />
        <StepWrapper>
          <Step />
        </StepWrapper>
        <SimulatorNavigationWrapper
          hasError={
            validators.find(
              (validator) =>
                validator.stepName === visibleSteps[currentStepIndex].name
            )?.isStepValid === false
              ? true
              : false
          }
          showNext={currentStepIndex < visibleSteps.length - 1}
          onPrint={
            currentStepIndex === visibleSteps.length - 1
              ? () => printResult(title)
              : undefined
          }
          onPrevious={currentStepIndex > 0 ? () => onPrevStep() : undefined}
          onNext={onNextStep}
          onStart={onNextStep}
        />
        {visibleSteps[currentStepIndex].options?.annotation && (
          <p>{visibleSteps[currentStepIndex].options?.annotation}</p>
        )}
      </StyledForm>
      {process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "test" &&
        debug}
    </StyledWrapper>
  );
};

const SimulatorLayout = <StepName extends string>(
  props: Props<StepName>
): JSX.Element => {
  return (
    <SimulatorStepProvider createStore={() => createSimulatorStore()}>
      <SimulatorContent {...props} />
    </SimulatorStepProvider>
  );
};

const STEP_LIST_WIDTH = "28rem";

const { breakpoints } = theme;

const StyledWrapper = styled(Wrapper)`
  padding: 0 !important;
`;

const StyledForm = styled.form`
  padding: 0 0 0 0;
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
  display: grid;
  grid-template-columns: fit-content(100%) 1fr;
  grid-template-rows: 130px;
  grid-template-areas:
    "a b"
    "a c"
    "a d";
  column-gap: 42px;
  padding-right: 42px;
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-areas:
      "b b"
      "a a"
      "c c"
      "d d";
    padding: 12px;
  }
`;

const StyledStepList = styled(StepList)`
  position: relative !important;
  grid-area: a;
  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 0.6rem;
  }
`;

const StyledTitle = styled(Title)`
  grid-area: b;
  margin-top: 40px;
`;

const StepWrapper = styled.div`
  grid-area: c;
  grid-template-columns: 17.5% 31.25% auto;
`;

const SimulatorNavigationWrapper = styled(SimulatorNavigation)`
  grid-area: d;
`;

export default SimulatorLayout;
