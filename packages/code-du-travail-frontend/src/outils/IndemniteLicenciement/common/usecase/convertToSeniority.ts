import { IndemniteLicenciementSeniority } from "../../../publicodes";
import { MOTIFS } from "../motifs";
import { Absence } from "../types";

const convertToPublicodesSeniority = (
  dateEntree: string,
  dateSortie: string,
  absences: Absence[]
): IndemniteLicenciementSeniority => {
  const seniority: Partial<IndemniteLicenciementSeniority> = {};
  for (let i = 0; i < MOTIFS.length; i++) {
    const motif = MOTIFS[i];
    const durationInMonth = absences.find(
      (abs) => motif.label === abs.motif
    )?.durationInMonth;
    seniority[motif.key] = durationInMonth ?? 0;
  }
  seniority.entryDate = dateEntree;
  seniority.exitDate = dateSortie;
  return seniority as IndemniteLicenciementSeniority;
};

export default convertToPublicodesSeniority;
