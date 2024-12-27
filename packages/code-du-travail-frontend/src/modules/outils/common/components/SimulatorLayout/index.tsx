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
};

export const SimulatorLayout = (props: Props<string>) => {
  const { emitPrintEvent, emitNextPreviousEvent } =
    useSimulatorLayoutTracking();
  const [navigationAction, setNavigationAction] = useState<
    "next" | "prev" | "none"
  >("none");
  const [currentStepIndex, setStepIndex] = useState(0);
  const { steps, title, onStepChange, hiddenStep, simulator } = props;

  const visibleSteps = useMemo(
    () =>
      steps.filter((step) => !hiddenStep || !hiddenStep.includes(step.name)),
    [steps, hiddenStep]
  );
  const nbTotalSteps = steps.length;
  const Step = visibleSteps[currentStepIndex].Component;
  const stepName = visibleSteps[currentStepIndex].name;
  const nextStepTitle = visibleSteps[currentStepIndex + 1]?.label;

  useEffect(() => {
    const currentStepName = visibleSteps[currentStepIndex].name;
    if (doNotTriggerMatomo(currentStepName)) return;
    emitNextPreviousEvent(title, navigationAction === "prev", currentStepName);
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
          setStepIndex(visibleSteps.length - 1);
          break;
        case ValidationResponse.Valid:
          setStepIndex(currentStepIndex + 1);
          break;
      }
      setNavigationAction("next");
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
      setStepIndex(currentStepIndex - 1);
      setNavigationAction("prev");
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  const onPrint = () => {
    try {
      const detailsTags = document.getElementsByTagName("details");
      for (let i = 0; i < detailsTags.length; i++) {
        detailsTags[i].setAttribute("open", "");
      }
      emitPrintEvent(title);

      window?.print();
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  };

  const validator = onStepChange.find(
    (validator) => validator.stepName === visibleSteps[currentStepIndex].name
  );

  return (
    <div className={fr.cx("fr-container")}>
      <Stepper
        currentStep={currentStepIndex + 1}
        nextTitle={nextStepTitle}
        stepCount={nbTotalSteps + 1}
        title={stepName}
      />

      <div className={fr.cx("fr-card", "fr-p-3w")}>
        <Step />
      </div>

      <div
        className={fr.cx(
          "fr-btns-group",
          "fr-btns-group--inline-reverse",
          "fr-btns-group--right",
          "fr-mt-2w"
        )}
      >
        {currentStepIndex > 1 && (
          <Button onClick={onPrevStep} priority="secondary">
            Précédent
          </Button>
        )}
        {currentStepIndex < nbTotalSteps && (
          <Button
            onClick={onNextStep}
            priority="primary"
            disabled={validator?.isStepValid === false}
          >
            Suivant
          </Button>
        )}
        {currentStepIndex === nbTotalSteps && (
          <Button onClick={onPrint} priority="primary">
            Imprimer le résultat
          </Button>
        )}
      </div>

      {visibleSteps[currentStepIndex].options?.annotation && (
        <div className="fr-text--sm fr-mt-3w">
          <p>{visibleSteps[currentStepIndex].options?.annotation}</p>
        </div>
      )}
    </div>
  );
};
