import React, { useContext, useEffect } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

import { ErrorPublicodes } from "./components";

type Props = {
  eligibleComponent?: JSX.Element;
  ineligibleComponent?: JSX.Element;
};

const StepResult = ({ eligibleComponent, ineligibleComponent }: Props) => {
  const store = useContext(IndemniteDepartContext);
  const { isEligible, init, errorPublicodes, getPublicodesResult } =
    useIndemniteDepartStore(store, (state) => ({
      isEligible: state.resultData.input.isEligible,
      init: state.resultFunction.init,
      errorPublicodes: state.resultData.error.errorPublicodes,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  useEffect(() => {
    const { isEligible } = init();
    if (isEligible) {
      getPublicodesResult();
    }
  }, []);

  if (errorPublicodes) {
    return <ErrorPublicodes />;
  }

  return <>{isEligible ? eligibleComponent : ineligibleComponent}</>;
};

export default StepResult;
