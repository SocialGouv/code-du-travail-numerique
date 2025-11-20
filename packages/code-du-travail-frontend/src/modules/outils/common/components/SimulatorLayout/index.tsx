import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Step, StepChange, ValidationResponse } from "./types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSimulatorLayoutTracking } from "./tracking";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import * as Sentry from "@sentry/nextjs";
import { scrollToTop } from "../../utils";
import { css } from "@styled-system/css";
import { AccessibleAlert } from "../AccessibleAlert";

type Props<T extends string> = {
  title: string;
  steps: Step<T>[];
  onStepChange: StepChange<T>[];
  hiddenStep?: string[];
  simulator: PublicodesSimulator;
  footerComponent?: React.ReactNode;
};

export const SimulatorLayout = ({
  steps,
  title,
  onStepChange,
  hiddenStep,
  footerComponent,
}: Props<string>) => {
  const { emitPrintEvent, emitNextPreviousEvent } =
    useSimulatorLayoutTracking();
  const [navigationAction, setNavigationAction] = useState<
    "next" | "prev" | "none"
  >("none");
  const stepperRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [lastIneligibleStep, setLastIneligibleStep] = useState<
    number | undefined
  >();
  const [simulationDate, setSimulationDate] = useState<string>("");
  const [printError, setPrintError] = useState<boolean>(false);

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
    if (navigationAction !== "none") {
      stepperRef.current?.focus();
    }
    emitNextPreviousEvent(title, navigationAction === "prev", currentStepName);
  }, [stepIndex]);

  useEffect(() => {
    setSimulationDate(
      new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

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
          setLastIneligibleStep(stepIndex);
          setStepIndex(visibleSteps.length - 1);
          break;
        case ValidationResponse.Valid:
          setStepIndex(nextStepIndex);
          setLastIneligibleStep(undefined);
          break;
      }
      setNavigationAction("next");
      scrollToTop();
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

    if (lastIneligibleStep) {
      setStepIndex(lastIneligibleStep);
      setLastIneligibleStep(undefined);
      setNavigationAction("prev");
      scrollToTop();
    } else if (previousStepIndex >= 0) {
      setStepIndex(previousStepIndex);
      setNavigationAction("prev");
      scrollToTop();
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const onPrint = () => {
    try {
      emitPrintEvent(title);
      window.print();
      setPrintError(false);
    } catch (e) {
      console.error(e);
      setPrintError(true);
    }
  };

  const validator = onStepChange.find(
    (validator) => validator.stepName === visibleSteps[stepIndex].name
  );

  return (
    <div>
      <div data-testid="stepper" className={hideOnPrint}>
        <div className={fr.cx("fr-stepper", "fr-mb-3w")}>
          <h2
            tabIndex={-1}
            ref={stepperRef}
            className={fr.cx("fr-stepper__title")}
          >
            {stepName}
            <span className={fr.cx("fr-stepper__state")}>
              Étape {currentNumStep} sur {nbTotalSteps}
            </span>
          </h2>
          <div
            className={fr.cx("fr-stepper__steps")}
            data-fr-current-step={currentNumStep}
            data-fr-steps={nbTotalSteps}
          ></div>
          {nextStepTitle !== undefined && (
            <p className={fr.cx("fr-stepper__details")}>
              <span className={fr.cx("fr-text--bold")}>
                Étape suivante&nbsp;:
              </span>{" "}
              {nextStepTitle}
            </p>
          )}
        </div>
      </div>

      <div className={printOnlyDate}>Simulé le {simulationDate}</div>

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
            className={fr.cx("fr-mr-2w", "fr-mb-3w")}
            data-testid="previous-button"
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
            nativeButtonProps={{
              "aria-disabled": validator?.isStepValid === false,
            }}
            className={fr.cx("fr-mr-2w", "fr-mb-3w")}
            data-testid="next-button"
          >
            {currentNumStep === 1 ? "Commencer" : "Suivant"}
          </Button>
        )}
        {currentNumStep === nbTotalSteps && (
          <Button
            onClick={onPrint}
            priority="secondary"
            iconId="ri-printer-fill"
            iconPosition="right"
            className={fr.cx("fr-mr-2w", "fr-mb-3w")}
            data-testid="print-button"
          >
            Imprimer le résultat
          </Button>
        )}
      </div>
      <div className={fr.cx("fr-grid-row")}>
        {printError && (
          <AccessibleAlert
            title="Une erreur est survenue"
            description="L'impression ne semble pas disponible sur votre appareil."
            severity="error"
          />
        )}
      </div>
      {footerComponent}
    </div>
  );
};

const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
});

const printOnlyDate = css({
  display: "none",
  "@media print": {
    display: "block",
    marginBottom: "1rem",
    fontStyle: "italic",
  },
});
