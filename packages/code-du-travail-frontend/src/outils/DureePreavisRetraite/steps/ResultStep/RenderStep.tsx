import React, { useContext } from "react";
import ResultStep from "./Step";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../../state";

const RenderResultStep = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);
  const result = usePreavisRetraiteStore(store, (state) => state.steps.result);
  if (!result) {
    throw Error("Try to show result without computed result data");
  }
  return (
    <ResultStep
      notice={result.notice}
      detail={result.detail}
      warning={result.warning}
    />
  );
};

export default RenderResultStep;
