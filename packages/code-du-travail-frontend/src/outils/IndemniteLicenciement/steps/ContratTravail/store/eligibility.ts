import { ContratTravailStoreInput } from "./types";

export const getErrorEligibility = (state: ContratTravailStoreInput) => {
  const elligibilityCheck: {
    errorEligibility: string;
    isIneligible: (input: ContratTravailStoreInput) => boolean;
  }[] = [
    {
      isIneligible: ({ typeContratTravail }) => typeContratTravail === "cdd",
      errorEligibility: `L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.`,
    },
    {
      isIneligible: ({ licenciementFauteGrave }) =>
        licenciementFauteGrave === "oui",
      errorEligibility: `L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde).
        Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.`,
    },
  ];
  const { errorEligibility } = elligibilityCheck.find(({ isIneligible }) =>
    isIneligible(state)
  ) ?? { errorEligibility: "" };
  return errorEligibility;
};
