import React, { useEffect } from "react";

import { useIndemniteLicenciementStore } from "../../store";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";

const StepResult = () => {
  const { isEligible, init } = useIndemniteLicenciementStore((state) => ({
    isEligible: state.resultData.input.isEligible,
    init: state.resultFunction.init,
  }));

  useEffect(() => {
    init();
  }, []);

  return <>{isEligible ? <Eligible /> : <Ineligible />}</>;
};

export default StepResult;
