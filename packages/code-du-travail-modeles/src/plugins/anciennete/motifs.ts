import { SupportedCcIndemniteLicenciement } from "../types";
import { MOTIFS_2511 } from "./2511_sport";
import { LEGAL_MOTIFS } from "./legal";
import type { Motif } from "./types";

export const getMotifs = (idcc: SupportedCcIndemniteLicenciement): Motif[] => {
  switch (idcc) {
    case SupportedCcIndemniteLicenciement.IDCC2511:
      return MOTIFS_2511;
    case SupportedCcIndemniteLicenciement.default:
    default:
      return LEGAL_MOTIFS;
  }
};
