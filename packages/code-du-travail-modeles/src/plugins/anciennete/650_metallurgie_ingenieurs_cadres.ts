import { LEGAL_MOTIFS } from "./legal";
import type { Motif } from "./types";

export const MOTIFS_650: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));
