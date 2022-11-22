import { LEGAL_MOTIFS } from "../../base";
import { MotifKeys } from "../../common/motif-keys";

export const MOTIFS_2609 = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
