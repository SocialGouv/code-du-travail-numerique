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
    const durationInMonthArray = absences
      .filter((abs) => motif.label === abs.motif)
      .map((abs) => abs.durationInMonth);
    const totalDurationInMonth = durationInMonthArray.reduce((acc, curr) => {
      if (acc !== undefined && curr !== undefined) {
        return acc + curr;
      } else {
        return acc;
      }
    }, 0);
    seniority[motif.key] = totalDurationInMonth;
  }
  seniority.entryDate = dateEntree;
  seniority.exitDate = dateSortie;
  return seniority as IndemniteLicenciementSeniority;
};

export default convertToPublicodesSeniority;
