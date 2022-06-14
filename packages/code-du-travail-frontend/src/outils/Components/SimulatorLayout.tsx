import { theme, Wrapper } from "@socialgouv/cdtn-ui";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { IndemniteLicenciementStepName } from "../IndemniteLicenciement";
import { matopush } from "../../piwik";
import { printResult } from "../common/utils";
import { StepList, Title } from "./SimulatorDecorator/Components";
import { createSimulatorStore, Step } from "../Simulator";
import {
  SimulatorStepProvider,
  useSimulatorStepStore,
} from "../Simulator/createContext";
import SimulatorNavigation from "./SimulatorNavigation";

type StepName = IndemniteLicenciementStepName;

type Validator = {
  validator: () => boolean;
  stepName: StepName;
  isStepValid: boolean;
};

type Props = {
  title: string;
  displayTitle: string;
  icon: string;
  duration: string;
  debug?: JSX.Element;
  steps: Step<StepName>[];
  validators: Validator[];
};

const SimulatorContent = ({
  title,
  displayTitle,
  icon,
  duration,
  debug,
  steps,
  validators,
}: Props): JSX.Element => {
  const anchorRef = React.createRef<HTMLLIElement>();

  const { currentStepIndex, previousStep, nextStep } = useSimulatorStepStore(
    (state) => state
  );

  const Step = steps[currentStepIndex].Component;

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
      const isValid = validators
        .find(
          (validator) => validator.stepName === steps[currentStepIndex].name
        )
        ?.validator();
      if (isValid) {
        nextStep();
        matopush([
          "trackEvent",
          "outil",
          `view_step_${title}`,
          steps[nextStepIndex].name,
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
        steps[previousStepIndex].name,
      ]);
      window?.scrollTo(0, 0);
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const onStart = () => {
    nextStep();
    window?.scrollTo(0, 0);
  };

  return (
    <Wrapper variant="main">
      <StyledForm>
        <Title
          title={displayTitle}
          duration={currentStepIndex === 0 ? duration : undefined}
          icon={icon}
          hasNoMarginBottom={steps[currentStepIndex].options?.hasNoMarginBottom}
        />
        <StepList
          activeIndex={currentStepIndex}
          steps={stepItems}
          width={STEP_LIST_WIDTH}
        />
        <Step />
        <SimulatorNavigation
          hasError={
            validators.find(
              (validator) => validator.stepName === steps[currentStepIndex].name
            )?.isStepValid === false
              ? true
              : false
          }
          showNext={currentStepIndex < steps.length - 1}
          onPrint={
            currentStepIndex === steps.length - 1
              ? () => printResult(title)
              : undefined
          }
          onPrevious={currentStepIndex > 0 ? () => onPrevStep() : undefined}
          onNext={onNextStep}
          onStart={onStart}
        />
        {steps[currentStepIndex].options?.annotation && (
          <p>{steps[currentStepIndex].options?.annotation}</p>
        )}
        {process.env.NODE_ENV !== "production" &&
          process.env.NODE_ENV !== "test" &&
          debug}
      </StyledForm>
    </Wrapper>
  );
};

const SimulatorLayout = (props: Props): JSX.Element => {
  return (
    <SimulatorStepProvider createStore={() => createSimulatorStore()}>
      <SimulatorContent {...props} />
    </SimulatorStepProvider>
  );
};

const STEP_LIST_WIDTH = "28rem";

const { breakpoints } = theme;

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

export default SimulatorLayout;
