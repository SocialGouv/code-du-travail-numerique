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
import { ToolName } from "../types";

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
    onNextStepIntroduction,
    onNextStepContratTravail,
    onPrevStepContratTravail,
    isStepContratTravailValid,
    onNextStepAnciennete,
    onPrevStepAnciennete,
    isStepAncienneteValid,
    onNextStepSalaires,
    onPrevStepSalaires,
    isStepSalairesValid,
    onNextStepAgreement,
    onPrevStepAgreement,
    isStepAgreementValid,
    onNextStepInformations,
    onPrevStepInformations,
    isStepInformationsValid,
    isStepInformationsHidden,
    isStepSalaryHidden,
    onPrevStepResults,
  } = useIndemniteLicenciementStore((state) => ({
    onNextStepIntroduction: state.introductionFunction.onNextStep,
    onNextStepContratTravail: state.contratTravailFunction.onNextStep,
    onPrevStepContratTravail: state.contratTravailFunction.onPrevStep,
    isStepContratTravailValid: state.contratTravailData.isStepValid,
    onNextStepAnciennete: state.ancienneteFunction.onNextStep,
    onPrevStepAnciennete: state.ancienneteFunction.onPrevStep,
    isStepAncienneteValid: state.ancienneteData.isStepValid,
    onNextStepSalaires: state.salairesFunction.onNextStep,
    onPrevStepSalaires: state.salairesFunction.onPrevStep,
    isStepSalairesValid: state.salairesData.isStepValid,
    onNextStepAgreement: state.agreementFunction.onNextStep,
    onPrevStepAgreement: state.agreementFunction.onPrevStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInformations: state.informationsFunction.onNextStep,
    onPrevStepInformations: state.informationsFunction.onPrevStep,
    isStepInformationsValid: state.informationsData.isStepValid,
    isStepInformationsHidden: state.informationsData.input.isStepHidden,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
    onPrevStepResults: state.resultFunction.onPrevStep,
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
      onStepChange={[
        {
          stepName: IndemniteLicenciementStepName.Introduction,
          onNextStep: onNextStepIntroduction,
        },
        {
          stepName: IndemniteLicenciementStepName.ContratTravail,
          isStepValid: isStepContratTravailValid,
          onNextStep: onNextStepContratTravail,
          onPrevStep: onPrevStepContratTravail,
        },
        {
          stepName: IndemniteLicenciementStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
          onPrevStep: onPrevStepAgreement,
        },
        {
          stepName: IndemniteLicenciementStepName.Anciennete,
          isStepValid: isStepAncienneteValid,
          onNextStep: onNextStepAnciennete,
          onPrevStep: onPrevStepAnciennete,
        },
        {
          stepName: IndemniteLicenciementStepName.Salaires,
          isStepValid: isStepSalairesValid,
          onNextStep: onNextStepSalaires,
          onPrevStep: onPrevStepSalaires,
        },
        {
          stepName: IndemniteLicenciementStepName.Informations,
          isStepValid: isStepInformationsValid,
          onNextStep: onNextStepInformations,
          onPrevStep: onPrevStepInformations,
        },
        {
          stepName: IndemniteLicenciementStepName.Resultat,
          onPrevStep: onPrevStepResults,
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
      createStore={() =>
        createIndemniteLicenciementStore(slug, ToolName.INDEMNITE_LICENCIEMENT)
      }
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};
