import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
}

const DureePreavisLicenciement = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => (
  <Wizard
    icon={icon}
    title={title}
    displayTitle={displayTitle}
    duration="2 à 5 min"
    initialState={initialState}
    stepReducer={stepReducer}
  />
);

export { DureePreavisLicenciement };
