"use client";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import React from "react";
import {
  StepAgreement,
  StepInformations,
} from "../common/indemnite-depart/steps";
import {
  StepAnciennete,
  StepContratTravail,
  StepIntro,
  StepResultat,
} from "./steps";
import { useRuptureCoEventEmitter } from "./events/useRuptureCoEventEmitter";
import {
  CalculateurIndemnite,
  IndemniteDepartStepName,
} from "../common/indemnite-depart";
import { Step } from "../common/components/SimulatorLayout/types";
import { IndemniteDepartType } from "../common/indemnite-depart/types";
import { EVENT_CATEGORY } from "src/outils/common/Feedback/tracking";
import StepSalaires from "../common/indemnite-depart/steps/Salaires";

const steps: Step<IndemniteDepartStepName>[] = [
  {
    label: "Introduction",
    name: IndemniteDepartStepName.Introduction,
    Component: StepIntro,
  },
  {
    label: "Contrat de travail",
    name: IndemniteDepartStepName.ContratTravail,
    Component: StepContratTravail,
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
  breadcrumbTitle: string;
  description: string;
};

const IndemniteRuptureCoSimulator = ({
  relatedItems,
  description,
  title,
  breadcrumbTitle,
}: Props) => {
  useRuptureCoEventEmitter();

  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={breadcrumbTitle}
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-indemnite-rupture-co">{title}</h1>
      <CalculateurIndemnite
        title={title}
        tool={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
        steps={steps}
        feedbackPopup={EVENT_CATEGORY.ruptureConventionnelle}
      />
    </ContainerSimulator>
  );
};

export default IndemniteRuptureCoSimulator;
