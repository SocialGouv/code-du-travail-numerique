import React from "react";
import { StepResultat } from "../../../CommonIndemniteDepart/steps";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";

const StepResult = () => {
  return (
    <StepResultat
      eligibleComponent={<Eligible />}
      ineligibleComponent={<Ineligible />}
    />
  );
};

export default StepResult;
