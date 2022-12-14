import { LEGAL_MOTIFS } from "../base";
import {
  MOTIFS_1518,
  MOTIFS_1527,
  MOTIFS_16,
  MOTIFS_2098,
  MOTIFS_2216,
  MOTIFS_2511,
  MOTIFS_2941,
  MOTIFS_3043,
  MOTIFS_3239,
  MOTIFS_44,
  MOTIFS_650,
} from "../conventions";
import type { Motif } from "./types";
import { SupportedCcIndemniteLicenciement } from "./types";

export const getMotifs = (idcc: SupportedCcIndemniteLicenciement): Motif[] => {
  switch (idcc) {
    case SupportedCcIndemniteLicenciement.IDCC2511:
      return MOTIFS_2511;
    case SupportedCcIndemniteLicenciement.IDCC3043:
      return MOTIFS_3043;
    case SupportedCcIndemniteLicenciement.IDCC1518:
      return MOTIFS_1518;
    case SupportedCcIndemniteLicenciement.IDCC2941:
      return MOTIFS_2941;
    case SupportedCcIndemniteLicenciement.IDCC1527:
      return MOTIFS_1527;
    case SupportedCcIndemniteLicenciement.IDCC3239:
      return MOTIFS_3239;
    case SupportedCcIndemniteLicenciement.IDCC650:
      return MOTIFS_650;
    case SupportedCcIndemniteLicenciement.IDCC2216:
      return MOTIFS_2216;
    case SupportedCcIndemniteLicenciement.IDCC0016:
      return MOTIFS_16;
    case SupportedCcIndemniteLicenciement.IDCC0044:
      return MOTIFS_44;
    case SupportedCcIndemniteLicenciement.IDCC2098:
      return MOTIFS_2098;
    case SupportedCcIndemniteLicenciement.default:
    default:
      return LEGAL_MOTIFS;
  }
};
