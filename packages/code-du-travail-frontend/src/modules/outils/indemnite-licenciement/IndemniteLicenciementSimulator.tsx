"use client";

import React from "react";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import { IndemniteDepartType } from "../indemnite-depart/types";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../indemnite-depart";
import { Step } from "../common/components/SimulatorLayout/types";
import { StepAgreement, StepInformations } from "../indemnite-depart/steps";
import { StepAnciennete, StepIntro, StepResultat } from "./steps";
import { useIndemniteLicenciementEventEmitter } from "./events/useIndemniteLicenciementEventEmitter";
import StepSalaires from "../indemnite-depart/steps/Salaires";
import { EVENT_CATEGORY } from "../indemnite-depart/feedback/tracking";
import StepAbsences from "../indemnite-depart/steps/Absences/components";

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
    Component: () => <StepSalaires type={IndemniteDepartType.LICENCIEMENT} />,
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

const IndemniteLicenciementSimulator = ({
  relatedItems,
  title,
  displayTitle,
}: Props) => {
  useIndemniteLicenciementEventEmitter();

  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={displayTitle}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <CalculateurIndemniteLicenciement title={title} />
    </ContainerSimulator>
  );
};

export const CalculateurIndemniteLicenciement = ({
  title,
}: Pick<Props, "title">) => {
  return (
    <CalculateurIndemnite
      title={title}
      tool={IndemniteDepartType.LICENCIEMENT}
      steps={steps}
      feedbackPopup={EVENT_CATEGORY.indemniteLicenciement}
    />
  );
};

export default IndemniteLicenciementSimulator;
