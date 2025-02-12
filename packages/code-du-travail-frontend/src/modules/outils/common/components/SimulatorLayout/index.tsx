import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { Step, StepChange, ValidationResponse } from "./types";
import { useEffect, useMemo, useState } from "react";
import { useSimulatorLayoutTracking } from "./tracking";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../../indemnite-depart";
import * as Sentry from "@sentry/nextjs";

type Props<T extends string> = {
  title: string;
  steps: Step<T>[];
  onStepChange: StepChange<T>[];
  hiddenStep?: string[];
  simulator: PublicodesSimulator;
  footerComponent?: React.ReactNode;
};

export const SimulatorLayout = (props: Props<string>) => {
  const { emitPrintEvent, emitNextPreviousEvent } =
    useSimulatorLayoutTracking();
  const [navigationAction, setNavigationAction] = useState<
    "next" | "prev" | "none"
  >("none");
  const [stepIndex, setStepIndex] = useState(0);
  const { steps, title, onStepChange, hiddenStep, simulator } = props;

  const visibleSteps = useMemo(
    () =>
      steps.filter((step) => !hiddenStep || !hiddenStep.includes(step.name)),
    [steps, hiddenStep]
  );
  const currentNumStep = stepIndex + 1;
  const nbTotalSteps = visibleSteps.length;
  const Step = visibleSteps[stepIndex].Component;
  const stepName = visibleSteps[stepIndex].label;
  const nextStepTitle = visibleSteps[stepIndex + 1]?.label;

  useEffect(() => {
    const currentStepName = visibleSteps[stepIndex].name;
    if (doNotTriggerMatomo(currentStepName)) return;
    emitNextPreviousEvent(title, navigationAction === "prev", currentStepName);
  }, [stepIndex]);

  const doNotTriggerMatomo = (stepName: string) =>
    navigationAction === "none" ||
    (stepName === IndemniteDepartStepName.Resultat &&
      simulator === PublicodesSimulator.INDEMNITE_LICENCIEMENT);

  const onNextStep = () => {
    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex >= visibleSteps.length) {
      throw Error("Can't show the next step with index more than steps");
    } else {
      const currentStepName = visibleSteps[stepIndex].name;

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
          setStepIndex(visibleSteps.length - 1);
          break;
        case ValidationResponse.Valid:
          setStepIndex(stepIndex + 1);
          break;
      }
      setNavigationAction("next");
    }
  };

  const onPrevStep = () => {
    const previousStepIndex = stepIndex - 1;
    const prevStepName = visibleSteps[previousStepIndex].name;
    const stepChange = onStepChange.find(
      (validator) => validator.stepName === prevStepName
    );
    if (stepChange?.onPrevStep) {
      stepChange.onPrevStep();
    }

    if (previousStepIndex >= 0) {
      setStepIndex(stepIndex - 1);
      setNavigationAction("prev");
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const onPrint = () => {
    try {
      emitPrintEvent(title);
      window.print();
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  };

  const validator = onStepChange.find(
    (validator) => validator.stepName === visibleSteps[stepIndex].name
  );

  return (
    <div>
      <div data-testid="stepper">
        <Stepper
          currentStep={currentNumStep}
          nextTitle={nextStepTitle}
          stepCount={nbTotalSteps}
          title={stepName}
          classes={{
            root: fr.cx("fr-mb-3w"),
          }}
        />
      </div>

      <div>
        <Step />
      </div>

      <div className={fr.cx("fr-mt-3w", "fr-grid-row", "fr-grid-row--middle")}>
        {currentNumStep > 1 && (
          <Button
            onClick={onPrevStep}
            priority="secondary"
            iconId="ri-arrow-left-line"
            iconPosition="left"
            className="fr-mr-2w"
          >
            Précédent
          </Button>
        )}
        {currentNumStep < nbTotalSteps && (
          <Button
            onClick={onNextStep}
            priority="primary"
            iconId="ri-arrow-right-line"
            iconPosition="right"
            disabled={validator?.isStepValid === false}
          >
            {currentNumStep === 1 ? "Commencer" : "Suivant"}
          </Button>
        )}
        {currentNumStep === nbTotalSteps && (
          <Button
            onClick={onPrint}
            priority="primary"
            iconId="ri-printer-fill"
            iconPosition="right"
          >
            Imprimer le résultat
          </Button>
        )}
      </div>

      {visibleSteps[stepIndex].options?.annotation && (
        <p className={fr.cx("fr-text--sm", "fr-mt-3w")}>
          {visibleSteps[stepIndex].options?.annotation}
        </p>
      )}
      {props.footerComponent}
    </div>
  );
};
