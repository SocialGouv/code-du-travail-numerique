import React, { useContext } from "react";
import { StepOrigin, StepIntro } from "./steps";
import {
  createPreavisRetraiteStore,
  PreavisRetraiteProvider,
  usePreavisRetraiteStore,
  PreavisRetraiteContext,
} from "./steps/store";
import { SimulatorLayout } from "../Components";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import AgreementStep from "./steps/Agreement";
import InformationsStep from "./steps/Informations";
import StepSeniority from "./steps/Seniority";
import StepResult from "./steps/Result";
import { Step } from "../Simulator";
import { IntroAnnotation } from "./steps/Introduction/components/Annotation";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};

enum PreavisRetraiteStepName {
  Intro = "intro",
  Origin = "origine",
  Agreement = "ccn",
  Infos = "infos",
  Seniority = "anciennete",
  Result = "result",
}

const steps: Step<PreavisRetraiteStepName>[] = [
  {
    label: "Introduction",
    name: PreavisRetraiteStepName.Intro,
    Component: StepIntro,
    options: { annotation: <IntroAnnotation /> },
  },
  {
    label: "Origine du départ à la retraite",
    name: PreavisRetraiteStepName.Origin,
    Component: StepOrigin,
  },
  {
    label: "Convention collective",
    name: PreavisRetraiteStepName.Agreement,
    Component: AgreementStep,
  },
  {
    label: "Informations",
    name: PreavisRetraiteStepName.Infos,
    Component: InformationsStep,
  },
  {
    label: "Ancienneté",
    name: PreavisRetraiteStepName.Seniority,
    Component: StepSeniority,
  },
  {
    label: "Résultat",
    name: PreavisRetraiteStepName.Result,
    Component: StepResult,
  },
];

export const CalculateurPreavisRetraite = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  const store = React.useRef(createPreavisRetraiteStore()).current;

  return (
    <PreavisRetraiteProvider value={store}>
      <PreavisRetraiteSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
        steps={steps}
      />
    </PreavisRetraiteProvider>
  );
};

const PreavisRetraiteSimulator = ({
  title,
  icon,
  displayTitle,
  steps,
}): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);
  const {
    onNextStepOriginDepart,
    isStepOriginDepartValid,
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInfos,
    isStepInfosValid,
    onNextStepSeniority,
    isStepSeniorityValid,
  } = usePreavisRetraiteStore(store, (state) => ({
    onNextStepOriginDepart: state.originDepartFunction.onNextStep,
    isStepOriginDepartValid: state.originDepartData.isStepValid,
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInfos: state.informationsFunction.onNextStep,
    isStepInfosValid: state.informationsData.isStepValid,
    onNextStepSeniority: state.seniorityFunction.onNextStep,
    isStepSeniorityValid: state.seniorityData.isStepValid,
  }));

  return (
    <SimulatorLayout<PreavisRetraiteStepName>
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 min"
      steps={steps}
      onStepChange={[
        {
          stepName: PreavisRetraiteStepName.Origin,
          isStepValid: isStepOriginDepartValid,
          onNextStep: onNextStepOriginDepart,
        },
        {
          stepName: PreavisRetraiteStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: PreavisRetraiteStepName.Infos,
          isStepValid: isStepInfosValid,
          onNextStep: onNextStepInfos,
        },
        {
          stepName: PreavisRetraiteStepName.Seniority,
          isStepValid: isStepSeniorityValid,
          onNextStep: onNextStepSeniority,
        },
      ]}
    />
  );
};
