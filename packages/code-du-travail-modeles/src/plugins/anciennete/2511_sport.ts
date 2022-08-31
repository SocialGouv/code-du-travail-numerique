import { LEGAL_MOTIFS } from "./legal";
import { MotifKeys } from "./motif-keys";
import type { Motif } from "./types";

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
