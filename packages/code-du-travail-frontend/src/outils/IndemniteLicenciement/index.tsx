import React from "react";
import { DebugInfo, SimulatorLayout } from "../Components";
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
  IndemniteLicenciementProvider,
  useIndemniteLicenciementStore,
} from "./store";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
  slug: string;
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
  const {
    onValidateWithEligibilityContratTravail,
    isStepContratTravailValid,
    onValidateWithEligibilityAnciennete,
    isStepAncienneteValid,
    onValidateSalaires,
    isStepSalairesValid,
    onValidateStepAgreement,
    isStepAgreementValid,
    onValidateWithEligibilityInformations,
    isStepInformationsValid,
    isStepInformationsHidden,
    isStepSalaryHidden,
  } = useIndemniteLicenciementStore((state) => ({
    onValidateWithEligibilityContratTravail:
      state.contratTravailFunction.onValidateWithEligibility,
    isStepContratTravailValid: state.contratTravailData.isStepValid,
    onValidateWithEligibilityAnciennete:
      state.ancienneteFunction.onValidateWithEligibility,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
    onValidateSalaires: state.salairesFunction.onValidateStep,
    isStepSalairesValid: state.salairesData.isStepValid,
    onValidateStepAgreement: state.agreementFunction.onValidateStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onValidateWithEligibilityInformations:
      state.informationsFunction.onValidateWithEligibility,
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
      agreement44Data: { ...state.agreement44Data },
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
          validatorWithEligibility: onValidateWithEligibilityContratTravail,
        },
        {
          stepName: IndemniteLicenciementStepName.Agreement,
          isStepValid: isStepAgreementValid,
          validatorWithEligibility: onValidateStepAgreement,
        },
        {
          stepName: IndemniteLicenciementStepName.Anciennete,
          isStepValid: isStepAncienneteValid,
          validatorWithEligibility: onValidateWithEligibilityAnciennete,
        },
        {
          stepName: IndemniteLicenciementStepName.Salaires,
          isStepValid: isStepSalairesValid,
          validatorWithEligibility: onValidateSalaires,
        },
        {
          stepName: IndemniteLicenciementStepName.Informations,
          isStepValid: isStepInformationsValid,
          validatorWithEligibility: onValidateWithEligibilityInformations,
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
  slug,
}: Props): JSX.Element => {
  return (
    <IndemniteLicenciementProvider
      createStore={() => createIndemniteLicenciementStore(slug)}
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
