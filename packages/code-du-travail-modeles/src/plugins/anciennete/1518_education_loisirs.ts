import { LEGAL_MOTIFS } from "./legal";
import type { Motif } from "./types";

export const MOTIFS_1518: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === "absenceCongesParentalEducation") {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
