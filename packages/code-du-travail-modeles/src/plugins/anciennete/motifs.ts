import { SupportedCcIndemniteLicenciement } from "../types";
import { MOTIFS_1518 } from "./1518_education_loisirs";
import { MOTIFS_2511 } from "./2511_sport";
import { MOTIFS_2941 } from "./2941_aide_accompagnement_soins_services_domicile";
import { MOTIFS_3043 } from "./3043_entreprises_proprete";
import { LEGAL_MOTIFS } from "./legal";
import type { Motif } from "./types";

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
    case SupportedCcIndemniteLicenciement.default:
    default:
      return LEGAL_MOTIFS;
  }
};
