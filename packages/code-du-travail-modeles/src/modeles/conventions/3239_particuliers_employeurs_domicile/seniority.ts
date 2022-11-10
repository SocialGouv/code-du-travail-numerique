import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif } from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export const MOTIFS_3239: Motif[] = LEGAL_MOTIFS.map((item) => {
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
