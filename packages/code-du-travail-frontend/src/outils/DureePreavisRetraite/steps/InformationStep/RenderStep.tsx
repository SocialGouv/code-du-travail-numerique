import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import InformationStep from "./Step";
import { useForm } from "react-final-form";

const RenderInformationStep = (): JSX.Element => {
  const { questions, error, onChange } = usePreavisRetraiteStore((state) => ({
    questions: state.steps.informations.questions,
    error: state.steps.informations.error,
    onChange: state.onInformationChange,
  }));
  const form = useForm();
  return (
    <InformationStep
      questions={questions}
      error={error}
      onChange={(name) => onChange(name, form)}
    />
  );
};

export default RenderInformationStep;
