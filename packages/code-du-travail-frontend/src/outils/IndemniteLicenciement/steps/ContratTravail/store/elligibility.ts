import { ContratTravailStoreInput } from "./types";

export const getErrorLegal = (state: ContratTravailStoreInput) => {
  const legalCheck: {
    errorLegal: string;
    isInelligible: (ContratTravailStoreInput) => boolean;
  }[] = [
    {
      isInelligible: ({ typeContratTravail }) => typeContratTravail === "cdd",
      errorLegal: `L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.`,
    },
    {
      isInelligible: ({ licenciementFauteGrave }) =>
        licenciementFauteGrave === "oui",
      errorLegal: `L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde).
        Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.`,
    },
  ];
  const { errorLegal } = legalCheck.find(({ isInelligible }) =>
    isInelligible(state)
  ) ?? { errorLegal: "" };
  return errorLegal;
};
