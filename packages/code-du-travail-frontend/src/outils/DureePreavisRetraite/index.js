import * as React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

function DureePreavisRetraite({ icon, title }) {
  return (
    <Wizard
      icon={icon}
      title={title}
      initialState={initialState}
      stepReducer={stepReducer}
    />
  );
}

export { DureePreavisRetraite };
