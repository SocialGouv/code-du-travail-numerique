import React, { useContext } from "react";
import {
  createIndemniteDepartStore,
  IndemniteDepartContext,
  IndemniteDepartProvider,
  useIndemniteDepartStore,
} from "./store";
import { IndemniteDepartType } from "./types";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Step } from "../common/components/SimulatorLayout/types";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import { Feedback } from "./feedback";
import { EVENT_CATEGORY } from "./feedback/tracking";

type SimulateurProps = CalculateurIndemniteProps & {
  title: string;
  tool: IndemniteDepartType;
};

export enum IndemniteDepartStepName {
  Introduction = "start",
  Agreement = "info_cc",
  Anciennete = "anciennete",
  Absences = "absences",
  Salaires = "salaires",
  Resultat = "results",
  Informations = "infos",
}

const IndemniteDepartSimulator = ({
  title,
  feedbackPopup,
  steps,
  tool,
}: SimulateurProps) => {
  const store = useContext(IndemniteDepartContext);
  const {
    onNextStepAnciennete,
    isStepAncienneteValid,
    onNextStepAbsences,
    isStepAbsencesValid,
    onNextStepSalaires,
    isStepSalairesValid,
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInformations,
    isStepInformationsValid,
    isStepInformationsHidden,
    isStepSalaryHidden,
  } = useIndemniteDepartStore(store, (state) => ({
    onNextStepAnciennete: state.ancienneteFunction.onNextStep,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
    onNextStepAbsences: state.absenceFunction.onNextStep,
    isStepAbsencesValid: state.absenceData.isStepValid,
    onNextStepSalaires: state.salairesFunction.onNextStep,
    isStepSalairesValid: state.salairesData.isStepValid,
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInformations: state.informationsFunction.onNextStep,
    isStepInformationsValid: state.informationsData.isStepValid,
    isStepInformationsHidden: state.informationsData.input.isStepHidden,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
  }));

  const getHiddenSteps = (): IndemniteDepartStepName[] => {
    const hiddenSteps: IndemniteDepartStepName[] = [];
    if (isStepInformationsHidden) {
      hiddenSteps.push(IndemniteDepartStepName.Informations);
    }
    if (isStepSalaryHidden) {
      hiddenSteps.push(IndemniteDepartStepName.Salaires);
    }
    return hiddenSteps;
  };

  return (
    <SimulatorLayout
      simulator={
        tool === IndemniteDepartType.RUPTURE_CONVENTIONNELLE
          ? PublicodesSimulator.RUPTURE_CONVENTIONNELLE
          : PublicodesSimulator.INDEMNITE_LICENCIEMENT
      }
      title={title}
      steps={steps}
      onStepChange={[
        {
          stepName: IndemniteDepartStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: IndemniteDepartStepName.Anciennete,
          isStepValid: isStepAncienneteValid,
          onNextStep: onNextStepAnciennete,
        },
        {
          stepName: IndemniteDepartStepName.Absences,
          isStepValid: isStepAbsencesValid,
          onNextStep: onNextStepAbsences,
        },
        {
          stepName: IndemniteDepartStepName.Salaires,
          isStepValid: isStepSalairesValid,
          onNextStep: onNextStepSalaires,
        },
        {
          stepName: IndemniteDepartStepName.Informations,
          isStepValid: isStepInformationsValid,
          onNextStep: onNextStepInformations,
        },
      ]}
      hiddenStep={getHiddenSteps()}
      footerComponent={feedbackPopup && <Feedback category={feedbackPopup} />}
    />
  );
};

type CalculateurIndemniteProps = {
  title: string;
  tool: IndemniteDepartType;
  steps: Step<IndemniteDepartStepName>[];
  feedbackPopup?: EVENT_CATEGORY;
};

export const CalculateurIndemnite = ({
  title,
  tool,
  steps,
  feedbackPopup,
}: CalculateurIndemniteProps) => {
  const store = React.useRef(createIndemniteDepartStore(tool)).current;

  return (
    <IndemniteDepartProvider value={store}>
      <IndemniteDepartSimulator
        title={title}
        tool={tool}
        steps={steps}
        feedbackPopup={feedbackPopup}
      />
    </IndemniteDepartProvider>
  );
};
