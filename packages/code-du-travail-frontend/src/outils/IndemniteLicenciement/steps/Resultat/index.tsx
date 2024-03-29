import React, { useContext, useEffect } from "react";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";
import { ErrorPublicodes } from "./components";

const StepResult = () => {
  const store = useContext(IndemniteLicenciementContext);
  const { isEligible, init, errorPublicodes, getPublicodesResult } =
    useIndemniteLicenciementStore(store, (state) => ({
      isEligible: state.resultData.input.isEligible,
      init: state.resultFunction.init,
      errorPublicodes: state.resultData.error.errorPublicodes,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isEligible) {
      getPublicodesResult();
    }
  }, [isEligible]);

  if (errorPublicodes) {
    return <ErrorPublicodes />;
  }

  return <>{isEligible ? <Eligible /> : <Ineligible />}</>;
};

export default StepResult;
