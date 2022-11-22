import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif } from "../../common";

export const MOTIFS_650: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));
