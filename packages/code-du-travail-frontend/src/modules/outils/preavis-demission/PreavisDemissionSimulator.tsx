"use client";

import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React, { useContext } from "react";
import StepIntro from "./steps/Introduction";
import {
  Step,
  ValidationResponse,
} from "../common/components/SimulatorLayout/types";
import {
  createPreavisDemissionStore,
  PreavisDemissionContext,
  usePreavisDemissionStore,
} from "./steps/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import StepResult from "./steps/Result";
import StepInformations from "./steps/Informations";
import StepAgreement from "./steps/Agreement";
import { usePreavisDemissionEventEmitter } from "./events/usePreavisDemissionEventEmitter";
import { HowToJsonLd } from "../../seo/jsonld";

enum PreavisDemissionStepName {
  Intro = "start",
  Agreement = "info_cc",
  Infos = "infos",
  Result = "results",
}

const steps: Step<PreavisDemissionStepName>[] = [
  {
    label: "Introduction",
    name: PreavisDemissionStepName.Intro,
    Component: StepIntro,
  },
  {
    label: "Convention collective",
    name: PreavisDemissionStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: PreavisDemissionStepName.Infos,
    Component: StepInformations,
  },
  {
    label: "Résultat",
    name: PreavisDemissionStepName.Result,
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
};

const PreavisDemissionSimulator = ({
  relatedItems,
  title,
  displayTitle,
}: Props) => {
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={displayTitle}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <HowToJsonLd
        name={displayTitle}
        url="/outils/preavis-demission"
        steps={steps.map((s) => s.label)}
      />
      <CalculateurPreavisDemission title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurPreavisDemission = ({ title }: { title: string }) => {
  const store = React.useRef(createPreavisDemissionStore()).current;
  return (
    <PreavisDemissionContext.Provider value={store}>
      <PreavisDemissionSimulatorContent title={title} steps={steps} />
    </PreavisDemissionContext.Provider>
  );
};

const PreavisDemissionSimulatorContent = ({
  title,
  steps,
}: {
  title: string;
  steps: Step<PreavisDemissionStepName>[];
}) => {
  const store = useContext(PreavisDemissionContext);

  const {
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInfos,
    isStepInfosValid,
    shouldSkipInfoStep,
  } = usePreavisDemissionStore(store, (state) => ({
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInfos: state.informationsFunction.onNextStep,
    isStepInfosValid: state.informationsData.isStepValid,
    shouldSkipInfoStep: state.informationsFunction.shouldSkipStep,
  }));

  usePreavisDemissionEventEmitter();

  const handleNextStepInfos = (): ValidationResponse => {
    if (shouldSkipInfoStep()) {
      return ValidationResponse.Valid;
    }
    return onNextStepInfos();
  };

  return (
    <SimulatorLayout
      simulator={PublicodesSimulator.PREAVIS_DEMISSION}
      title={title}
      steps={steps}
      onStepChange={[
        {
          stepName: PreavisDemissionStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: PreavisDemissionStepName.Infos,
          isStepValid: isStepInfosValid || shouldSkipInfoStep(),
          onNextStep: handleNextStepInfos,
        },
      ]}
    />
  );
};

export default PreavisDemissionSimulator;
