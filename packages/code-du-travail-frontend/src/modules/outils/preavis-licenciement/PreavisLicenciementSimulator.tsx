"use client";

import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React, { useContext } from "react";
import StepIntroduction from "./steps/Introduction";
import { Step } from "../common/components/SimulatorLayout/types";
import {
  createPreavisLicenciementStore,
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "./steps/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { SimulatorLayout } from "../common/components/SimulatorLayout";
import StepResult from "./steps/Result";
import StepAgreement from "./steps/Agreement";
import StepStatus from "./steps/Status";
import StepInformations from "./steps/Informations";

enum PreavisLicenciementStepName {
  Intro = "start",
  Status = "status",
  Agreement = "info_cc",
  Infos = "infos",
  Result = "results",
}

const steps: Step<PreavisLicenciementStepName>[] = [
  {
    label: "Introduction",
    name: PreavisLicenciementStepName.Intro,
    Component: StepIntroduction,
  },
  {
    label: "Situation du salarié",
    name: PreavisLicenciementStepName.Status,
    Component: StepStatus,
  },
  {
    label: "Convention collective",
    name: PreavisLicenciementStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: PreavisLicenciementStepName.Infos,
    Component: StepInformations,
  },
  {
    label: "Résultat",
    name: PreavisLicenciementStepName.Result,
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

const PreavisLicenciementSimulator = ({
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
      <CalculateurPreavisLicenciement title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurPreavisLicenciement = ({
  title,
}: {
  title: string;
}) => {
  const store = React.useRef(createPreavisLicenciementStore()).current;
  return (
    <PreavisLicenciementContext.Provider value={store}>
      <PreavisLicenciementSimulatorContent title={title} steps={steps} />
    </PreavisLicenciementContext.Provider>
  );
};

const PreavisLicenciementSimulatorContent = ({
  title,
  steps,
}: {
  title: string;
  steps: Step<PreavisLicenciementStepName>[];
}): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);

  const {
    onNextStepStatus,
    isStepStatusValid,
    onNextStepAgreement,
    isStepAgreementValid,
    onNextStepInfos,
    isStepInfosValid,
    isStepInformationsHidden,
  } = usePreavisLicenciementStore(store, (state) => ({
    onNextStepStatus: state.statusFunction.onNextStep,
    isStepStatusValid: state.statusData.isStepValid,
    onNextStepAgreement: state.agreementFunction.onNextStep,
    isStepAgreementValid: state.agreementData.isStepValid,
    onNextStepInfos: state.informationsFunction.onNextStep,
    isStepInfosValid: state.informationsData.isStepValid,
    isStepInformationsHidden: state.informationsData.input.isStepHidden,
  }));

  const getHiddenSteps = (): PreavisLicenciementStepName[] => {
    const hiddenSteps: PreavisLicenciementStepName[] = [];
    if (isStepInformationsHidden) {
      hiddenSteps.push(PreavisLicenciementStepName.Infos);
    }
    return hiddenSteps;
  };

  return (
    <SimulatorLayout
      simulator={PublicodesSimulator.PREAVIS_LICENCIEMENT}
      title={title}
      steps={steps}
      hiddenStep={getHiddenSteps()}
      onStepChange={[
        {
          stepName: PreavisLicenciementStepName.Status,
          isStepValid: isStepStatusValid,
          onNextStep: onNextStepStatus,
        },
        {
          stepName: PreavisLicenciementStepName.Agreement,
          isStepValid: isStepAgreementValid,
          onNextStep: onNextStepAgreement,
        },
        {
          stepName: PreavisLicenciementStepName.Infos,
          isStepValid: isStepInfosValid,
          onNextStep: onNextStepInfos,
        },
      ]}
    />
  );
};

export default PreavisLicenciementSimulator;
