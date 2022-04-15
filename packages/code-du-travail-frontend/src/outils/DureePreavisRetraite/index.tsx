import React from "react";

import {
  PublicodesPreavisRetraiteResult,
  PublicodesProvider,
  PublicodesSimulator,
  usePublicodes,
} from "../publicodes";
import { initialState, stepReducer } from "./stepReducer";
import Simulator from "../Components/Simulator";
import type {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
} from "./types";
import renderStep from "./renderStep";

interface Props {
  icon: string;
  title: string;
  publicodesRules: any;
}

const SimulateurPreavisRetraite = ({
  icon,
  title,
  publicodesRules,
}: Props): JSX.Element => (
  <PublicodesProvider
    rules={publicodesRules}
    simulator={PublicodesSimulator.PREAVIS_RETRAITE}
  >
    <Content icon={icon} title={title} />
  </PublicodesProvider>
);

const Content = ({
  title,
  icon,
}: {
  icon: string;
  title: string;
}): JSX.Element => {
  const publicodes = usePublicodes<PublicodesPreavisRetraiteResult>();

  return (
    <Simulator<
      PreavisRetraiteState,
      PreavisRetraiteAction<PreavisRetraiteFormState>,
      PreavisRetraiteFormState
    >
      title={title}
      icon={icon}
      duration="5 min"
      initialValues={{}}
      initialState={initialState}
      stepReducer={stepReducer(publicodes)}
      renderStep={renderStep}
    />
  );
};

export { SimulateurPreavisRetraite };
