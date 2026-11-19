"use client";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React from "react";
import { StepInformations } from "../indemnite-depart/steps";
import { StepAnciennete, StepIntro, StepResultat } from "./steps";
import { useIndemniteRetraiteEventEmitter } from "./events/useIndemniteRetraiteEventEmitter";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../indemnite-depart";
import { Step } from "../common/components/SimulatorLayout/types";
import { IndemniteDepartType } from "../indemnite-depart/types";
import StepSalaires from "../indemnite-depart/steps/Salaires";
import StepAbsences from "../indemnite-depart/steps/Absences/components";
import { listingSegment } from "../../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";

// La V1 ne s'appuie que sur le Code du travail : l'étape « Convention
// collective » du simulateur d'indemnité de licenciement est retirée.
const steps: Step<IndemniteDepartStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteDepartStepName.Introduction,
    Component: StepIntro,
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
    Component: () => <StepSalaires type={IndemniteDepartType.RETRAITE} />,
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

const IndemniteRetraiteSimulator = ({
  relatedItems,
  title,
  displayTitle,
}: Props) => {
  useIndemniteRetraiteEventEmitter();

  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={displayTitle}
      breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
    >
      <CalculateurIndemniteRetraite title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurIndemniteRetraite = ({
  title,
}: Pick<Props, "title">) => {
  return (
    <CalculateurIndemnite
      title={title}
      tool={IndemniteDepartType.RETRAITE}
      steps={steps}
    />
  );
};

export default IndemniteRetraiteSimulator;
