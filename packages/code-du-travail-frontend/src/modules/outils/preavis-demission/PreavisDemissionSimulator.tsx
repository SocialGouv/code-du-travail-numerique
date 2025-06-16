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

enum PreavisDemissionStepName {
  Intro = "intro",
  Agreement = "ccn",
  Infos = "infos",
  Result = "result",
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
}): JSX.Element => {
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

  // Fonction personnalisée pour gérer le passage à l'étape suivante pour les Informations
  const handleNextStepInfos = (): ValidationResponse => {
    // Si l'étape doit être passée automatiquement, on retourne Valid directement
    if (shouldSkipInfoStep()) {
      return ValidationResponse.Valid;
    }
    // Sinon, on utilise la logique normale
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
