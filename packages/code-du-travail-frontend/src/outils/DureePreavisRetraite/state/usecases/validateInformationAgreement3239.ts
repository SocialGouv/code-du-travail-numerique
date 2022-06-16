import { PreavisRetraiteStore } from "../types";

const validateInformationAgreement3239 = (
  state: PreavisRetraiteStore
): PreavisRetraiteStore => {
  if (
    state.formValues.infos?.[
      "contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle"
    ] === "'Assistants maternels du particulier employeur'" &&
    state.formValues.origin?.isRetirementMandatory === "oui"
  ) {
    return {
      ...state,
      steps: {
        ...state.steps,
        informations: {
          ...state.steps.informations,
          error:
            "Les règles concernant la rupture du contrat de travail par le particulier employeur sont prévues par la convention collective et le Code de l’action sociale et des familles. Ces textes n’envisagent pas la mise à la retraite. Pour obtenir une durée de préavis, il doit s'agir d'un départ volontaire du salarié à la retraite (étape n°2 du simulateur).",
        },
      },
    };
  }
  return {
    ...state,
    steps: {
      ...state.steps,
      informations: {
        ...state.steps.informations,
        error: undefined,
      },
    },
  };
};

export default validateInformationAgreement3239;
