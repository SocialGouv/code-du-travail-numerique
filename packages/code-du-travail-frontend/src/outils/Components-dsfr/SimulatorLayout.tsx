import React, { useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { StepList, Title } from "./SimulatorDecorator/Components";
import { createSimulatorStore, Step } from "../Simulator";
import {
  SimulatorContext,
  SimulatorStepProvider,
  useSimulatorStepStore,
} from "../Simulator/createContext";
import SimulatorNavigation from "./SimulatorNavigation";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoActionEvent, MatomoBaseEvent } from "../../lib";
import { IndemniteDepartStepName } from "../CommonIndemniteDepart";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import scrollToTop from "../common/utils/scrollToTop";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import { fr } from "@codegouvfr/react-dsfr";
import {printResult} from "../common/utils";

export enum ValidationResponse {
  NotValid = "not_valid",
  NotEligible = "not_eligible",
  Valid = "valid",
}

export type StepChange<StepName extends string> = {
  onNextStep?: () => ValidationResponse;
  onPrevStep?: () => void;
  stepName: StepName;
  isStepValid?: boolean;
};

type Props<StepName extends string> = {
  title: string;
  displayTitle: string;
  icon: string;
  duration: string;
  debug?: JSX.Element;
  steps: Step<StepName>[];
  onStepChange: StepChange<StepName>[];
  hiddenStep?: StepName[];
  simulator: PublicodesSimulator;
};

const SimulatorContent = <StepName extends string>({
  title,
  displayTitle,
  icon,
  duration,
  debug,
  steps,
  onStepChange,
  hiddenStep,
  simulator,
}: Props<StepName>): JSX.Element => {
  const anchorRef = React.createRef<HTMLLIElement>();
  const [navigationAction, setNavigationAction] = React.useState<
    "next" | "prev" | "none"
  >("none");
  const store = useContext(SimulatorContext);
  const { currentStepIndex, previousStep, nextStep } = useSimulatorStepStore(
    store,
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

  useEffect(() => {
    const currentStepName = visibleSteps[currentStepIndex].name;
    if (doNotTriggerMatomo(currentStepName)) return;
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      navigationAction === "prev"
        ? MatomoActionEvent.CLICK_PREVIOUS + `_${title}`
        : MatomoActionEvent.VIEW_STEP + `_${title}`,
      currentStepName,
    ]);
  }, [currentStepIndex]);

  const doNotTriggerMatomo = (stepName: string) =>
    navigationAction === "none" ||
    (stepName === IndemniteDepartStepName.Resultat &&
      simulator === PublicodesSimulator.INDEMNITE_LICENCIEMENT);

  const onNextStep = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= visibleSteps.length) {
      throw Error("Can't show the next step with index more than steps");
    } else {
      const currentStepName = visibleSteps[currentStepIndex].name;

      const stepChange = onStepChange.find(
        (validator) => validator.stepName === currentStepName
      );

      let validationResponse = ValidationResponse.Valid;
      if (stepChange?.onNextStep) {
        validationResponse =
          stepChange?.onNextStep() ?? ValidationResponse.NotValid;
      }

      switch (validationResponse) {
        case ValidationResponse.NotEligible:
          nextStep(visibleSteps.length - 1);
          break;
        case ValidationResponse.Valid:
          nextStep();
          break;
      }
      setNavigationAction("next");
      scrollToTop();
    }
  };

  const onPrevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    const prevStepName = visibleSteps[previousStepIndex].name;
    const stepChange = onStepChange.find(
      (validator) => validator.stepName === prevStepName
    );
    if (stepChange?.onPrevStep) {
      stepChange.onPrevStep();
    }

    if (previousStepIndex >= 0) {
      previousStep();
      setNavigationAction("prev");
      scrollToTop();
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const validator = onStepChange.find(
    (validator) => validator.stepName === visibleSteps[currentStepIndex].name
  );
  return (
    <div className={"fr-container"}>
      <div className={"fr-col-md-8 fr-col-sm-10 fr-col-12 fr-pb-md-12v"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Stepper
            className={fr.cx("fr-mt-3w")}
            currentStep={currentStepIndex + 1}
            nextTitle={stepItems[currentStepIndex + 1].label}
            stepCount={stepItems.length}
            title={stepItems[currentStepIndex].label}
          />

          <Step />

          <SimulatorNavigationWrapper
            hasError={validator?.isStepValid === false}
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
        </form>
        {process.env.NEXT_PUBLIC_APP_ENV !== "production" &&
          process.env.NEXT_PUBLIC_APP_ENV !== "test" &&
          debug}
      </div>
    </div>
  );
};

/*
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
          hasError={validator?.isStepValid === false}
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
 */

const SimulatorLayout = <StepName extends string>(
  props: Props<StepName>
): JSX.Element => {
  const store = useRef(createSimulatorStore()).current;
  return (
    <SimulatorStepProvider value={store}>
      <SimulatorContent {...props} />
    </SimulatorStepProvider>
  );
};

const StyledForm = styled.form`
  padding: 0 0 0 0;
  overflow: visible;
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
`;

const SimulatorNavigationWrapper = styled(SimulatorNavigation)`
  grid-area: d;
`;

export default SimulatorLayout;
