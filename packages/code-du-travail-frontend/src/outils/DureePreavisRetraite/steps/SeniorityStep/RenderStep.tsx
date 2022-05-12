import React from "react";
import SeniorityStep from "./Step";
import { usePreavisRetraiteStore } from "../../state";
import { useForm } from "react-final-form";

const RenderSeniorityStep = (): JSX.Element => {
  const { minYearCount, showAccurateSeniority, onChange } =
    usePreavisRetraiteStore((state) => ({
      minYearCount: state.steps.seniority.minYearCount,
      showAccurateSeniority: state.steps.seniority.showAccurateSeniority,
      onChange: state.onSeniorityChange,
    }));
  const form = useForm();
  return (
    <SeniorityStep
      minYearCount={minYearCount}
      showAccurateSeniority={showAccurateSeniority}
      onChange={() => onChange(form)}
    />
  );
};

export default RenderSeniorityStep;
