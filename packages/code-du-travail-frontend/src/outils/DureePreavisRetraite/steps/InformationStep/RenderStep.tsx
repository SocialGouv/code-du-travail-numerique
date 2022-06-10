import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import InformationStep from "./Step";
import { useForm } from "react-final-form";

const RenderInformationStep = (): JSX.Element => {
  const { questions, onChange } = usePreavisRetraiteStore((state) => ({
    questions: state.steps.informations.questions,
    onChange: state.onInformationChange,
  }));
  const form = useForm();
  return (
    <InformationStep
      questions={questions}
      onChange={(name) => onChange(name, form)}
    />
  );
};

export default RenderInformationStep;
