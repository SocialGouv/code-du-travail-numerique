import React, { useContext } from "react";
import { SimulatorLayout } from "../Components";
import { Step } from "../Simulator";
import {
  createIndemniteDepartStore,
  IndemniteDepartContext,
  IndemniteDepartProvider,
  useIndemniteDepartStore,
} from "./store";
import { IndemniteDepartType } from "../types";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Feedback } from "../common/Feedback";
import styled from "styled-components";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  tool: IndemniteDepartType;
  steps: Step<IndemniteDepartStepName>[];
  hasFeedbackPopup: boolean;
};

type SimulateurProps = Props & {
  icon: string;
  title: string;
  displayTitle: string;
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
  icon,
  displayTitle,
  hasFeedbackPopup,
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
    <Flex>
      <SimulatorLayout<IndemniteDepartStepName>
        simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
        title={title}
        displayTitle={displayTitle}
        icon={icon}
        duration="5 à 10 min"
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
      {hasFeedbackPopup && <Feedback />}
    </Flex>
  );
};

export const CalculateurIndemnite = ({
  icon,
  title,
  displayTitle,
  tool,
  steps,
  hasFeedbackPopup,
}: Props): JSX.Element => {
  const store = React.useRef(createIndemniteDepartStore(tool)).current;

  return (
    <IndemniteDepartProvider value={store}>
      <IndemniteDepartSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
        tool={tool}
        steps={steps}
        hasFeedbackPopup={hasFeedbackPopup}
      />
    </IndemniteDepartProvider>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
