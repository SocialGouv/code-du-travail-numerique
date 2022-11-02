import { LEGAL_MOTIFS } from "../../base";
import type { Motif } from "../../common";
import { MotifKeys } from "../../common";

export const MOTIFS_2511: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.accidentTrajet ||
    item.key === MotifKeys.congesPaternite
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
