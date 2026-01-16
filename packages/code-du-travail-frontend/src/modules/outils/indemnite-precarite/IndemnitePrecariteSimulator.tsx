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
  StepInfosGenerales,
  StepRemuneration,
  StepResultat,
} from "./steps";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { HowToJsonLd } from "../../seo/jsonld";

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
    label: "Informations générales",
    name: IndemnitePrecariteStepName.InfosGenerales,
    Component: StepInfosGenerales,
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
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <HowToJsonLd
        name={displayTitle}
        url="/outils/indemnite-precarite"
        steps={steps.map((s) => s.label)}
      />
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
    onNextStepInfos,
    isStepInfosValid,
    onNextStepRemuneration,
    isStepRemunerationValid,
  } = useIndemnitePrecariteStore(store, (state) => ({
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInfos: state.informationsFunction.onNextStep,
    isStepInfosValid: state.informationsData.isStepValid,
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
          stepName: IndemnitePrecariteStepName.InfosGenerales,
          isStepValid: isStepInfosValid,
          onNextStep: onNextStepInfos,
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
