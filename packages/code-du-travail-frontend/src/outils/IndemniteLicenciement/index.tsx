import React, { useContext } from "react";
import { SimulatorLayout } from "../Components";
import { Step } from "../Simulator";
import {
  StepAgreement,
  StepAnciennete,
  StepContratTravail,
  StepInformations,
  StepIntro,
  StepResultat,
  StepSalaires,
} from "./steps";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementContext,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";
import { ToolName } from "../types";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Feedback } from "../common/Feedback";
import styled from "styled-components";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};

export enum IndemniteLicenciementStepName {
  Introduction = "start",
  ContratTravail = "contrat_travail",
  Agreement = "info_cc",
  Anciennete = "anciennete",
  Salaires = "salaires",
  Resultat = "results",
  Informations = "infos",
}

const steps: Step<IndemniteLicenciementStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteLicenciementStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Contrat de travail",
    name: IndemniteLicenciementStepName.ContratTravail,
    Component: StepContratTravail,
  },
  {
    label: "Convention collective",
    name: IndemniteLicenciementStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: IndemniteLicenciementStepName.Informations,
    Component: StepInformations,
  },
  {
    label: "Ancienneté",
    name: IndemniteLicenciementStepName.Anciennete,
    Component: StepAnciennete,
  },
  {
    label: "Salaires",
    name: IndemniteLicenciementStepName.Salaires,
    Component: StepSalaires,
  },
  {
    label: "Indemnité",
    name: IndemniteLicenciementStepName.Resultat,
    Component: StepResultat,
  },
];

const IndemniteLicenciementSimulator = ({
  title,
  icon,
  displayTitle,
}: Omit<Props, "publicodesRules" | "slug">): JSX.Element => {
  const store = useContext(IndemniteLicenciementContext);
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
  } = useIndemniteLicenciementStore(store, (state) => ({
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

  const getHiddenSteps = (): IndemniteLicenciementStepName[] => {
    const hiddenSteps: IndemniteLicenciementStepName[] = [];
    if (isStepInformationsHidden) {
      hiddenSteps.push(IndemniteLicenciementStepName.Informations);
    }
    if (isStepSalaryHidden) {
      hiddenSteps.push(IndemniteLicenciementStepName.Salaires);
    }
    return hiddenSteps;
  };

  return (
    <Flex>
      <SimulatorLayout<IndemniteLicenciementStepName>
        simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
        title={title}
        displayTitle={displayTitle}
        icon={icon}
        duration="5 à 10 min"
        steps={steps}
        onStepChange={[
          {
            stepName: IndemniteLicenciementStepName.ContratTravail,
            isStepValid: isStepContratTravailValid,
            onNextStep: onNextStepContratTravail,
          },
          {
            stepName: IndemniteLicenciementStepName.Agreement,
            isStepValid: isStepAgreementValid,
            onNextStep: onNextStepAgreement,
          },
          {
            stepName: IndemniteLicenciementStepName.Anciennete,
            isStepValid: isStepAncienneteValid,
            onNextStep: onNextStepAnciennete,
          },
          {
            stepName: IndemniteLicenciementStepName.Salaires,
            isStepValid: isStepSalairesValid,
            onNextStep: onNextStepSalaires,
          },
          {
            stepName: IndemniteLicenciementStepName.Informations,
            isStepValid: isStepInformationsValid,
            onNextStep: onNextStepInformations,
          },
        ]}
        hiddenStep={getHiddenSteps()}
      />
      <Feedback />
    </Flex>
  );
};

export const CalculateurIndemnite = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  const store = React.useRef(
    createIndemniteLicenciementStore(
      PublicodesSimulator.INDEMNITE_LICENCIEMENT,
      ToolName.INDEMNITE_LICENCIEMENT
    )
  ).current;

  return (
    <IndemniteLicenciementProvider value={store}>
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
