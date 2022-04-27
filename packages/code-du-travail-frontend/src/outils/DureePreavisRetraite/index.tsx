import React from "react";
import Simulator from "../Components/Simulator";
import { PreavisRetraiteStepLabel } from "./types";
import {
  IntroductionStep,
  RenderAgreementStep,
  RenderInformationStep,
  RenderOriginStep,
} from "./steps";
import type { PreavisRetraiteStore } from "./state";
import { createPreavisRetraiteStore } from "./state";
import createContext from "zustand/context";
import { StoreApi } from "zustand";
import DebugInfo from "./Components/DebugInfo";

interface Props {
  icon: string;
  title: string;
  publicodesRules: any;
}

const { Provider, useStore } = createContext<StoreApi<PreavisRetraiteStore>>();

const SimulateurPreavisRetraite = ({
  icon,
  title,
  publicodesRules,
}: Props): JSX.Element => (
  <Provider
    createStore={() => createPreavisRetraiteStore(publicodesRules, title)}
  >
    <Content icon={icon} title={title} />
  </Provider>
);

const Content = ({
  title,
  icon,
}: {
  icon: string;
  title: string;
}): JSX.Element => {
  const { onChange } = useStore((state) => ({
    onChange: state.onFormValuesChange,
  }));

  return (
    <Simulator
      title={title}
      icon={icon}
      duration="5 min"
      debug={<DebugInfo />}
      onFormValuesChange={onChange}
      steps={[
        {
          name: "Introduction",
          label: PreavisRetraiteStepLabel.intro,
          Component: IntroductionStep,
        },
        {
          name: "Origine du départ",
          label: PreavisRetraiteStepLabel.origin,
          Component: RenderOriginStep,
        },
        {
          name: "Convention collective",
          label: PreavisRetraiteStepLabel.agreement,
          Component: RenderAgreementStep,
        },
        {
          name: "Informations",
          label: PreavisRetraiteStepLabel.infos,
          Component: RenderInformationStep,
        },
        /*
          {
            name: "anciennete",
            label: PreavisRetraiteStepLabel.seniority,
          },
          {
            name: "result",
            label: PreavisRetraiteStepLabel.result,
          },
        */
      ]}
    />
  );
};

export { SimulateurPreavisRetraite, useStore as usePreavisRetraiteStore };
