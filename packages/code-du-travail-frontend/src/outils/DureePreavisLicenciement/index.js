import React from "react";

import { Wizard } from "../common/Wizard";
import { initialSteps, stepReducer } from "./stepReducer";

function DureePreavisLicenciement({ icon, title }) {
  return (
    <Wizard
      icon={icon}
      title={title}
      initialSteps={initialSteps}
      stepReducer={stepReducer}
    />
  );
}

export { DureePreavisLicenciement };
