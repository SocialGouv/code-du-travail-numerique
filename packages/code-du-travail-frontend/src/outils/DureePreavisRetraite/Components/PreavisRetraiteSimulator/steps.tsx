import {
  IntroductionStep,
  RenderAgreementStep,
  RenderInformationStep,
  RenderOriginStep,
  RenderResultStep,
  RenderSeniorityStep,
  StepName,
} from "../../steps";
import IntroAnnotation from "../../steps/component/IntroAnnotation";
import React from "react";

export const steps = [
  {
    label: "Introduction",
    name: StepName.Intro,
    Component: IntroductionStep,
    options: {
      annotation: <IntroAnnotation />,
    },
  },
  {
    label: "Origine du départ à la retraite",
    name: StepName.Origin,
    Component: RenderOriginStep,
  },
  {
    label: "Convention collective",
    name: StepName.Agreement,
    Component: RenderAgreementStep,
  },
  {
    label: "Informations",
    name: StepName.Infos,
    Component: RenderInformationStep,
  },
  {
    label: "Ancienneté",
    name: StepName.Seniority,
    Component: RenderSeniorityStep,
  },
  {
    label: "Résultat",
    name: StepName.Result,
    Component: RenderResultStep,
  },
];
