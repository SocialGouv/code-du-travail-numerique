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
import { Step } from "../../../Simulator";
import { PreavisRetraiteFormState } from "../../form";

export const steps: Step<StepName>[] = [
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
    options: {
      isForm: true,
    },
  },
  {
    label: "Convention collective",
    name: StepName.Agreement,
    Component: RenderAgreementStep,
    options: {
      isForm: true,
    },
  },
  {
    label: "Informations",
    name: StepName.Infos,
    Component: RenderInformationStep,
    options: {
      isForm: true,
      validate: (data: PreavisRetraiteFormState) => {
        if (
          data.origin?.isRetirementMandatory === "oui" &&
          data.infos?.[
            "contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
          ] === "'Assistants maternels du particulier employeur'"
        ) {
          return { errorAgreement3239: true };
        }
        return undefined;
      },
    },
  },
  {
    label: "Ancienneté",
    name: StepName.Seniority,
    Component: RenderSeniorityStep,
    options: {
      isForm: true,
    },
  },
  {
    label: "Résultat",
    name: StepName.Result,
    Component: RenderResultStep,
  },
];
