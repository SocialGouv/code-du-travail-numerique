import React from "react";
import { DebugInfo, SimulatorLayout } from "../Components";
import { Step } from "../Simulator";
import {
  StepIntro,
  StepContratTravail,
  StepAnciennete,
  StepSalaires,
  StepResultat,
  StepAgreement,
  StepInformations,
} from "./steps";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
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
}: Omit<Props, "publicodesRules">): JSX.Element => {
  const {
    onValidateStepContratTravail,
    isStepContratTravailValid,
    onValidateStepAnciennete,
    isStepAncienneteValid,
    onValidateStepSalaires,
    isStepSalairesValid,
    onValidateStepAgreement,
    isStepAgreementValid,
    onValidateStepInformations,
    isStepInformationsValid,
    isStepInformationsHidden,
    isStepSalaryHidden,
  } = useIndemniteLicenciementStore((state) => ({
    onValidateStepContratTravail:
      state.contratTravailFunction.onValidateStepInfo,
    isStepContratTravailValid: state.contratTravailData.isStepValid,
    onValidateStepAnciennete: state.ancienneteFunction.onValidateStepAnciennete,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
    onValidateStepSalaires: state.salairesFunction.onValidateStepSalaires,
    isStepSalairesValid: state.salairesData.isStepValid,
    onValidateStepAgreement: state.agreementFunction.onValidateStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onValidateStepInformations: state.informationsFunction.onValidateStep,
    isStepInformationsValid: state.informationsData.isStepValid,
    isStepInformationsHidden: state.informationsData.input.isStepHidden,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
  }));

  const data = useIndemniteLicenciementStore((state) => {
    let resultDataWithoutPublicodes = { ...state.resultData };
    delete resultDataWithoutPublicodes.publicodes;
    let informationsDataWithoutPublicodes = { ...state.informationsData };
    delete informationsDataWithoutPublicodes.publicodes;
    return {
      contratTravailData: { ...state.contratTravailData },
      agreementData: { ...state.agreementData },
      informationsData: informationsDataWithoutPublicodes,
      ancienneteData: { ...state.ancienneteData },
      salairesData: { ...state.salairesData },
      resultData: resultDataWithoutPublicodes,
      agreement1516Data: { ...state.agreement1516Data },
      agreement1527Data: { ...state.agreement1527Data },
      agreement16Data: { ...state.agreement16Data },
    };
  });

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
    <SimulatorLayout<IndemniteLicenciementStepName>
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 à 10 min"
      debug={<DebugInfo data={data} />}
      steps={steps}
      validators={[
        {
          stepName: IndemniteLicenciementStepName.ContratTravail,
          isStepValid: isStepContratTravailValid,
          validator: onValidateStepContratTravail,
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
        {
          stepName: IndemniteLicenciementStepName.Informations,
          isStepValid: isStepInformationsValid,
          validator: onValidateStepInformations,
        },
      ]}
      hiddenStep={getHiddenSteps()}
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
