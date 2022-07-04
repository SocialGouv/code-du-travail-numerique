import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import InformationStep from "./Step";
import { useForm } from "react-final-form";
import { PreavisRetraiteFormState } from "../../form";

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

RenderInformationStep.validate = (data: PreavisRetraiteFormState) => {
  if (
    data.origin?.isRetirementMandatory === "oui" &&
    data.infos?.[
      "contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
    ] === "'Assistants maternels du particulier employeur'"
  ) {
    return { errorAgreement3239: true };
  }
  return undefined;
};

export default RenderInformationStep;
