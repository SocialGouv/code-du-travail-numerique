import React, { useContext } from "react";
import { StepOrigin, StepIntro } from "./steps";
import {
  createPreavisRetraiteStore,
  PreavisRetraiteProvider,
  usePreavisRetraiteStore,
  PreavisRetraiteContext,
} from "./steps/store";
import { SimulatorLayout } from "../Components";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};

type Step = {
  name: PreavisRetraiteStepName;
  label: string;
  Component: () => JSX.Element;
};

enum PreavisRetraiteStepName {
  Intro = "intro",
  Origin = "origine",
  Agreement = "ccn",
  Infos = "infos",
  Seniority = "anciennete",
  Result = "result",
}

const steps: Step[] = [
  {
    label: "Introduction",
    name: PreavisRetraiteStepName.Intro,
    Component: StepIntro,
  },
  {
    label: "Origine du départ à la retraite",
    name: PreavisRetraiteStepName.Origin,
    Component: StepOrigin,
  },
  {
    label: "Convention collective",
    name: PreavisRetraiteStepName.Agreement,
    Component: StepAgreement,
  },
];

export const CalculateurPreavisRetraite = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  const store = React.useRef(createPreavisRetraiteStore()).current;

  return (
    <PreavisRetraiteProvider value={store}>
      <PreavisRetraiteSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
        steps={steps}
      />
    </PreavisRetraiteProvider>
  );
};

const PreavisRetraiteSimulator = ({
  title,
  icon,
  displayTitle,
  steps,
}): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);
  const { onNextStepOriginDepart, isStepOriginDepartValid } =
    usePreavisRetraiteStore(store, (state) => ({
      onNextStepOriginDepart: state.originDepartFunction.onNextStep,
      isStepOriginDepartValid: state.originDepartData.isStepValid,
    }));

  return (
    <SimulatorLayout<PreavisRetraiteStepName>
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
      title={title}
      displayTitle={displayTitle}
      icon={icon}
      duration="5 min"
      steps={steps}
      onStepChange={[
        {
          stepName: PreavisRetraiteStepName.Origin,
          isStepValid: isStepOriginDepartValid,
          onNextStep: onNextStepOriginDepart,
        },
      ]}
    />
  );
};
