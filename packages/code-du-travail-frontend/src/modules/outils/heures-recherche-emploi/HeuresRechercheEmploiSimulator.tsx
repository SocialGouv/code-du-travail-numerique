"use client";

import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React, { useContext } from "react";
import StepIntro from "./steps/Introduction";
import { Step } from "../common/components/SimulatorLayout/types";
import {
  createHeuresRechercheEmploiStore,
  HeuresRechercheEmploiContext,
  useHeuresRechercheEmploiStore,
} from "./steps/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import StepResult from "./steps/Result";
import StepInformations from "./steps/Informations";
import StepAgreement from "./steps/Agreement";
import { useHeuresRechercheEmploiEventEmitter } from "./events/useHeuresRechercheEmploiEventEmitter";

enum HeuresRechercheEmploiStepName {
  Intro = "start",
  Agreement = "info_cc",
  Infos = "infos",
  Result = "results",
}

const steps: Step<HeuresRechercheEmploiStepName>[] = [
  {
    label: "Introduction",
    name: HeuresRechercheEmploiStepName.Intro,
    Component: StepIntro,
  },
  {
    label: "Convention collective",
    name: HeuresRechercheEmploiStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: HeuresRechercheEmploiStepName.Infos,
    Component: StepInformations,
  },
  {
    label: "Résultat",
    name: HeuresRechercheEmploiStepName.Result,
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

const HeuresRechercheEmploiSimulator = ({
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
      <CalculateurHeuresRechercheEmploi title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurHeuresRechercheEmploi = ({
  title,
}: {
  title: string;
}) => {
  const store = React.useRef(createHeuresRechercheEmploiStore()).current;
  return (
    <HeuresRechercheEmploiContext.Provider value={store}>
      <HeuresRechercheEmploiSimulatorContent title={title} steps={steps} />
    </HeuresRechercheEmploiContext.Provider>
  );
};

const HeuresRechercheEmploiSimulatorContent = ({
  title,
  steps,
}: {
  title: string;
  steps: Step<HeuresRechercheEmploiStepName>[];
}): JSX.Element => {
  const store = useContext(HeuresRechercheEmploiContext);

  useHeuresRechercheEmploiEventEmitter();

  const {
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInfos,
    isStepInfosValid,
  } = useHeuresRechercheEmploiStore(store, (state) => ({
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInfos: state.informationsFunction.onNextStep,
    isStepInfosValid: state.informationsData.isStepValid,
  }));

  return (
    <SimulatorLayout
      simulator={PublicodesSimulator.HEURES_RECHERCHE_EMPLOI}
      title={title}
      steps={steps}
      onStepChange={[
        {
          stepName: HeuresRechercheEmploiStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: HeuresRechercheEmploiStepName.Infos,
          isStepValid: isStepInfosValid,
          onNextStep: onNextStepInfos,
        },
      ]}
    />
  );
};

export default HeuresRechercheEmploiSimulator;
