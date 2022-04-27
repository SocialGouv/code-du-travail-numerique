import React from "react";
import { usePreavisRetraiteStore } from "../../index";
import InformationStep from "./Step";
import { useForm } from "react-final-form";
import { PreavisRetraiteFormState } from "../../form";

const RenderInformationStep = (): JSX.Element => {
  const { questions, onChange } = usePreavisRetraiteStore((state) => ({
    questions: state.steps.informations.questions,
    onChange: state.onInformationChange,
  }));
  const form = useForm<PreavisRetraiteFormState>();
  return (
    <InformationStep
      questions={questions}
      onChange={(name, value) => onChange(name, value, form)}
    />
  );
};

export default RenderInformationStep;
