import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

interface Props {
  icon: string;
  title: string;
  titleH1: string;
}

const HeuresRechercheEmploi = ({
  icon,
  title,
  titleH1,
}: Props): JSX.Element => (
  <Wizard
    icon={icon}
    title={title}
    titleH1={titleH1}
    duration="2 à 5 min"
    initialState={initialState}
    stepReducer={stepReducer}
  />
);

export { HeuresRechercheEmploi };
