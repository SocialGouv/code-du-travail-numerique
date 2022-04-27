import React from "react";
import SeniorityStep from "./Step";
import { usePreavisRetraiteStore } from "../../index";

const RenderSeniorityStep = (): JSX.Element => {
  const { minYearCount, showAccurateSeniority, onChange } =
    usePreavisRetraiteStore((state) => ({
      minYearCount: state.steps.seniority.minYearCount,
      showAccurateSeniority: state.steps.seniority.showAccurateSeniority,
      onChange: state.onInformationChange,
    }));
  return (
    <SeniorityStep
      minYearCount={minYearCount}
      showAccurateSeniority={showAccurateSeniority}
    />
  );
};

export default RenderSeniorityStep;
