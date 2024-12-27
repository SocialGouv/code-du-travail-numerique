import React from "react";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";
import { StepResultat } from "src/outils/CommonIndemniteDepart/steps";

const StepResult = () => {
  return (
    <StepResultat
      eligibleComponent={<Eligible />}
      ineligibleComponent={<Ineligible />}
    />
  );
};

export default StepResult;
