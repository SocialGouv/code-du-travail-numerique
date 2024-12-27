import React, { useContext } from "react";
import {
  createIndemniteDepartStore,
  IndemniteDepartContext,
  IndemniteDepartProvider,
  useIndemniteDepartStore,
} from "./store";
import { IndemniteDepartType } from "./types";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Feedback } from "../components/Feedback";
import { EVENT_CATEGORY } from "../components/Feedback/tracking";
import { Step } from "../components/SimulatorLayout/types";
import { SimulatorLayout } from "../components/SimulatorLayout";

type SimulateurProps = CalculateurIndemniteProps & {
  title: string;
  tool: IndemniteDepartType;
};

export enum IndemniteDepartStepName {
  Introduction = "start",
  ContratTravail = "contrat_travail",
  Agreement = "info_cc",
  Anciennete = "anciennete",
  Salaires = "salaires",
  Resultat = "results",
  Informations = "infos",
}

const IndemniteDepartSimulator = ({
  title,
  feedbackPopup,
  steps,
}: SimulateurProps): JSX.Element => {
  const store = useContext(IndemniteDepartContext);
  const {
    onNextStepContratTravail,
    isStepContratTravailValid,
    onNextStepAnciennete,
    isStepAncienneteValid,
    onNextStepSalaires,
    isStepSalairesValid,
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInformations,
    isStepInformationsValid,
    isStepInformationsHidden,
    isStepSalaryHidden,
  } = useIndemniteDepartStore(store, (state) => ({
    onNextStepContratTravail: state.contratTravailFunction.onNextStep,
    isStepContratTravailValid: state.contratTravailData.isStepValid,
    onNextStepAnciennete: state.ancienneteFunction.onNextStep,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
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
    <div>
      <SimulatorLayout
        simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
        title={title}
        steps={steps}
        onStepChange={[
          {
            stepName: IndemniteDepartStepName.ContratTravail,
            isStepValid: isStepContratTravailValid,
            onNextStep: onNextStepContratTravail,
          },
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
      />
      {feedbackPopup && <Feedback category={feedbackPopup} />}
    </div>
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
}: CalculateurIndemniteProps): JSX.Element => {
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
