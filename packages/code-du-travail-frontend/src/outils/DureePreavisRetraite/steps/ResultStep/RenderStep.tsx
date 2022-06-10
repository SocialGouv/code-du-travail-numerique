import React from "react";
import ResultStep from "./Step";
import { usePreavisRetraiteStore } from "../../state";

const RenderResultStep = (): JSX.Element => {
  const result = usePreavisRetraiteStore((state) => state.steps.result);
  if (!result) {
    throw Error("Try to show result without computed result data");
  }
  return <ResultStep notice={result.notice} detail={result.detail} />;
};

export default RenderResultStep;
