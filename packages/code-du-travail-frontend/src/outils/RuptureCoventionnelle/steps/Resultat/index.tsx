import React from "react";
import { StepResultat } from "../../../CommonIndemniteDepart/steps";
import Eligible from "./Eligible";

const StepResult = () => {
  return <StepResultat eligibleComponent={Eligible} />;
};

export default StepResult;
