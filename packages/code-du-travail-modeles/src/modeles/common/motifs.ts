import { LEGAL_MOTIFS } from "../base";
import type { Motif } from "../common";
import { SupportedCcIndemniteLicenciement } from "../common";
import { MOTIFS_16 } from "../conventions/16_transports_routiers";
import { MOTIFS_650 } from "../conventions/650_metallurgie_ingenieurs_cadres";
import { MOTIFS_1518 } from "../conventions/1518_education_loisirs";
import { MOTIFS_1527 } from "../conventions/1527_immobilier";
import { MOTIFS_2216 } from "../conventions/2216_commerces_detail_alimentation";
import { MOTIFS_2511 } from "../conventions/2511_sport";
import { MOTIFS_2941 } from "../conventions/2941_aide_accompagnement_soins_services_domicile";
import { MOTIFS_3043 } from "../conventions/3043_entreprises_proprete";
import { MOTIFS_3239 } from "../conventions/3239_particuliers_employeurs_domicile";

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
    case SupportedCcIndemniteLicenciement.default:
    default:
      return LEGAL_MOTIFS;
  }
};
