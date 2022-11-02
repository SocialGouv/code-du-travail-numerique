import { LEGAL_MOTIFS } from "../../base";
import type { Motif } from "../../common";

export const MOTIFS_3043: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));
