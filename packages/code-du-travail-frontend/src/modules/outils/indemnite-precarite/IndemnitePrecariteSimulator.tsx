"use client";

import React, { useContext } from "react";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import {
  Step,
  ValidationResponse,
} from "../common/components/SimulatorLayout/types";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import { IndemnitePrecariteStepName } from "./types";
import {
  useIndemnitePrecariteStore,
  IndemnitePrecariteContext,
  createIndemnitePrecariteStore,
} from "./steps/store";
import {
  StepIntroduction,
  StepAgreement,
  StepTypeContrat,
  StepTermeContrat,
  StepRemuneration,
  StepResultat,
} from "./steps";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { listingSegment } from "../../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";

const steps: Step<IndemnitePrecariteStepName>[] = [
  {
    label: "Introduction",
    name: IndemnitePrecariteStepName.Introduction,
    Component: StepIntroduction,
  },
  {
    label: "Convention collective",
    name: IndemnitePrecariteStepName.ConventionCollective,
    Component: StepAgreement,
  },
  {
    label: "Type de contrat",
    name: IndemnitePrecariteStepName.TypeContrat,
    Component: StepTypeContrat,
  },
  {
    label: "Terme du contrat",
    name: IndemnitePrecariteStepName.TermeContrat,
    Component: StepTermeContrat,
  },
  {
    label: "Rémunération",
    name: IndemnitePrecariteStepName.Remuneration,
    Component: StepRemuneration,
  },
  {
    label: "Résultat",
    name: IndemnitePrecariteStepName.Resultat,
    Component: StepResultat,
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

const IndemnitePrecariteSimulator = ({
  relatedItems,
  title,
  displayTitle,
}: Props) => {
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={displayTitle}
      breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
    >
      <CalculateurIndemnitePrecarite title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurIndemnitePrecarite = ({ title }: { title: string }) => {
  const store = React.useRef(createIndemnitePrecariteStore()).current;
  return (
    <IndemnitePrecariteContext.Provider value={store}>
      <IndemnitePrecariteSimulatorContent title={title} steps={steps} />
    </IndemnitePrecariteContext.Provider>
  );
};

const IndemnitePrecariteSimulatorContent = ({
  title,
  steps,
}: {
  title: string;
  steps: Step<IndemnitePrecariteStepName>[];
}) => {
  const store = useContext(IndemnitePrecariteContext);

  if (!store) {
    throw new Error(
      "IndemnitePrecariteSimulatorContent must be used within IndemnitePrecariteContext"
    );
  }

  const {
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepTypeContrat,
    isStepTypeContratValid,
    onNextStepTermeContrat,
    isStepTermeContratValid,
    onNextStepRemuneration,
    isStepRemunerationValid,
  } = useIndemnitePrecariteStore(store, (state) => ({
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepTypeContrat: state.typeContratFunction.onNextStep,
    isStepTypeContratValid: state.typeContratData.isStepValid,
    onNextStepTermeContrat: state.termeContratFunction.onNextStep,
    isStepTermeContratValid: state.termeContratData.isStepValid,
    onNextStepRemuneration: state.remunerationFunction.onNextStep,
    isStepRemunerationValid: state.remunerationData.isStepValid,
  }));

  return (
    <SimulatorLayout
      simulator={PublicodesSimulator.INDEMNITE_PRECARITE}
      title={title}
      steps={steps}
      onStepChange={[
        {
          stepName: IndemnitePrecariteStepName.ConventionCollective,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: IndemnitePrecariteStepName.TypeContrat,
          isStepValid: isStepTypeContratValid,
          onNextStep: onNextStepTypeContrat,
        },
        {
          stepName: IndemnitePrecariteStepName.TermeContrat,
          isStepValid: isStepTermeContratValid,
          onNextStep: onNextStepTermeContrat,
        },
        {
          stepName: IndemnitePrecariteStepName.Remuneration,
          isStepValid: isStepRemunerationValid,
          onNextStep: onNextStepRemuneration,
        },
      ]}
    />
  );
};

export default IndemnitePrecariteSimulator;
