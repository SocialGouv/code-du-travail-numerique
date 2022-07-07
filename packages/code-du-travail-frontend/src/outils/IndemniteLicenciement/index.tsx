import React from "react";
import { DebugInfo, SimulatorLayout } from "../Components";
import { Step } from "../Simulator";
import {
  StepIntro,
  StepContratTravail,
  StepAnciennete,
  StepSalaires,
  StepResultat,
} from "./steps";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";
import { AgreementStep } from "./steps/Agreement";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
};

export enum IndemniteLicenciementStepName {
  Introduction = "start",
  Info = "contrat_travail",
  Agreement = "ccn",
  Anciennete = "anciennete",
  Salaires = "salaires",
  Resultat = "results",
}

const steps: Step<IndemniteLicenciementStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteLicenciementStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Contrat de travail",
    name: IndemniteLicenciementStepName.Info,
    Component: StepContratTravail,
  },
  {
    label: "Convention collective",
    name: IndemniteLicenciementStepName.Agreement,
    Component: AgreementStep,
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
    label: "Indemnité légale",
    name: IndemniteLicenciementStepName.Resultat,
    Component: StepResultat,
  },
];

const IndemniteLicenciementSimulator = ({
  title,
  icon,
  displayTitle,
}: Omit<Props, "publicodesRules">): JSX.Element => {
  const {
    onValidateStepInfo,
    isStepInfoValid,
    onValidateStepAnciennete,
    isStepAncienneteValid,
    onValidateStepSalaires,
    isStepSalairesValid,
    onValidateStepAgreement,
    isStepAgreementValid,
  } = useIndemniteLicenciementStore((state) => ({
    onValidateStepInfo: state.contratTravailFunction.onValidateStepInfo,
    isStepInfoValid: state.contratTravailData.isStepValid,
    onValidateStepAnciennete: state.ancienneteFunction.onValidateStepAnciennete,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
    onValidateStepSalaires: state.salairesFunction.onValidateStepSalaires,
    isStepSalairesValid: state.salairesData.isStepValid,
    onValidateStepAgreement: state.agreementFunction.onValidateStep,
    isStepAgreementValid: state.agreementData.isStepValid,
  }));

  const data = useIndemniteLicenciementStore((state) => {
    let resultDataWithoutPublicodes = { ...state.resultData };
    delete resultDataWithoutPublicodes.publicodes;
    return {
      contratTravailData: { ...state.contratTravailData },
      agreementData: { ...state.agreementData },
      ancienneteData: { ...state.ancienneteData },
      salairesData: { ...state.salairesData },
      resultData: resultDataWithoutPublicodes,
      agreement1516Data: { ...state.agreement1516Data },
    };
  });

  return (
    <SimulatorLayout<IndemniteLicenciementStepName>
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 à 10 min"
      debug={<DebugInfo data={data} />}
      steps={steps}
      validators={[
        {
          stepName: IndemniteLicenciementStepName.Info,
          isStepValid: isStepInfoValid,
          validator: onValidateStepInfo,
        },
        {
          stepName: IndemniteLicenciementStepName.Agreement,
          isStepValid: isStepAgreementValid,
          validator: onValidateStepAgreement,
        },
        {
          stepName: IndemniteLicenciementStepName.Anciennete,
          isStepValid: isStepAncienneteValid,
          validator: onValidateStepAnciennete,
        },
        {
          stepName: IndemniteLicenciementStepName.Salaires,
          isStepValid: isStepSalairesValid,
          validator: onValidateStepSalaires,
        },
      ]}
    />
  );
};

export const CalculateurIndemnite = ({
  icon,
  title,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element => {
  return (
    <IndemniteLicenciementProvider
      createStore={() => createIndemniteLicenciementStore(publicodesRules)}
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
