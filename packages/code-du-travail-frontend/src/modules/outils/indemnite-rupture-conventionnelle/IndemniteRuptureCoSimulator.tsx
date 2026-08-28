"use client";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React from "react";
import { StepAgreement, StepInformations } from "../indemnite-depart/steps";
import { StepAnciennete, StepIntro, StepResultat } from "./steps";
import { useRuptureCoEventEmitter } from "./events/useRuptureCoEventEmitter";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../indemnite-depart";
import { Step } from "../common/components/SimulatorLayout/types";
import { IndemniteDepartType } from "../indemnite-depart/types";
import StepSalaires from "../indemnite-depart/steps/Salaires";
import { SIMULATOR_FEEDBACK_CONTEXT } from "../indemnite-depart/feedback/tracking";
import StepAbsences from "../indemnite-depart/steps/Absences/components";
import { listingSegment } from "../../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";

const steps: Step<IndemniteDepartStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteDepartStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Convention collective",
    name: IndemniteDepartStepName.Agreement,
    Component: StepAgreement,
  },
  {
    label: "Informations",
    name: IndemniteDepartStepName.Informations,
    Component: StepInformations,
  },
  {
    label: "Ancienneté",
    name: IndemniteDepartStepName.Anciennete,
    Component: StepAnciennete,
  },
  {
    label: "Absences",
    name: IndemniteDepartStepName.Absences,
    Component: StepAbsences,
  },
  {
    label: "Salaires",
    name: IndemniteDepartStepName.Salaires,
    Component: () => (
      <StepSalaires type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE} />
    ),
  },
  {
    label: "Indemnité",
    name: IndemniteDepartStepName.Resultat,
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

const IndemniteRuptureCoSimulator = ({
  relatedItems,
  title,
  displayTitle,
}: Props) => {
  useRuptureCoEventEmitter();

  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={displayTitle}
      breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
    >
      <CalculateurIndemniteRuptureCo title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurIndemniteRuptureCo = ({
  title,
}: Pick<Props, "title">) => {
  return (
    <CalculateurIndemnite
      title={title}
      tool={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
      steps={steps}
      feedbackPopup={SIMULATOR_FEEDBACK_CONTEXT.ruptureConventionnelle}
    />
  );
};

export default IndemniteRuptureCoSimulator;
