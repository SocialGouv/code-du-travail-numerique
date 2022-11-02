import { LEGAL_MOTIFS } from "../../base";
import type { Motif } from "../../common";
import { MotifKeys } from "../../common";

export const MOTIFS_1518: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesParentalEducation) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
