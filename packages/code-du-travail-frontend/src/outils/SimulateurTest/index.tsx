import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

interface Props {
  icon: string;
  title: string;
}

const SimulateurTest = ({ icon, title }: Props): JSX.Element => (
  <Wizard
    icon={icon}
    title={title}
    duration="1 à 2 min"
    initialState={initialState}
    stepReducer={stepReducer}
  />
);

export { SimulateurTest };
