import { LEGAL_MOTIFS } from "../../base/seniority";
import { MotifKeys } from "../../common/motif-keys";

export const MOTIFS_2098 = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
