import React from "react";

import { useIndemniteLicenciementStore } from "../../store";
import { Ineligible, Eligible } from "./components";

const StepResult = () => {
  const { isEligible } = useIndemniteLicenciementStore((state) => ({
    isEligible: state.resultFunction.isEligible,
  }));

  const eligible = isEligible();

  return (
    <>
      {eligible && <Eligible></Eligible>}
      {!eligible && <Ineligible></Ineligible>}
    </>
  );
};

export default StepResult;
