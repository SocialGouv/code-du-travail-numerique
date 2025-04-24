"use client";

import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React, { useContext } from "react";
import { StepIntro, StepOrigin } from "./steps";
import { Step } from "../common/components/SimulatorLayout/types";
import {
  createPreavisRetraiteStore,
  PreavisRetraiteContext,
  usePreavisRetraiteStore,
} from "./steps/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import StepSeniority from "./steps/Seniority";
import StepResult from "./steps/Result";
import StepInformations from "./steps/Informations";
import StepAgreement from "./steps/Agreement";

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
  },
  {
    label: "Origine du départ à la retraite",
    name: PreavisRetraiteStepName.Origin,
    Component: StepOrigin,
  },
  {
    label: "Convention collective",
    name: PreavisRetraiteStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: PreavisRetraiteStepName.Infos,
    Component: StepInformations,
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

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  title: string;
  displayTitle: string;
  description: string;
};

const PreavisRetraiteSimulator = ({
  relatedItems,
  description,
  title,
  displayTitle,
}: Props) => {
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={title}
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-preavis-retraite">{displayTitle}</h1>
      <CalculateurPreavisRetraite title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurPreavisRetraite = ({ title }: { title: string }) => {
  const store = React.useRef(createPreavisRetraiteStore()).current;
  return (
    <PreavisRetraiteContext.Provider value={store}>
      <PreavisRetraite title={title} />
    </PreavisRetraiteContext.Provider>
  );
};

const PreavisRetraite = ({ title }: Pick<Props, "title">) => {
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
    <SimulatorLayout
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
      title={title}
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

export default PreavisRetraiteSimulator;
