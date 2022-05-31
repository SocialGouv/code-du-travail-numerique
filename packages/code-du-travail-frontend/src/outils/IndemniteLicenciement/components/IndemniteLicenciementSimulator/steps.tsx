import {
  InfoStep,
  IntroductionStep,
  ResultStep,
  SalariesStep,
  SeniorityStep,
  StepName,
} from "../../steps";
import React from "react";
import { Step } from "../../../Simulator";

export const steps: Step<StepName>[] = [
  {
    label: "Introduction",
    name: StepName.Intro,
    Component: IntroductionStep,
  },
  {
    label: "Contrat de travail",
    name: StepName.Info,
    Component: InfoStep,
  },
  {
    label: "Ancienneté",
    name: StepName.Seniority,
    Component: SeniorityStep,
    options: {
      isForm: true,
    },
  },
  {
    label: "Salaires",
    name: StepName.Salaries,
    Component: SalariesStep,
  },
  {
    label: "Indemnité légale",
    name: StepName.Result,
    Component: ResultStep,
  },
];
