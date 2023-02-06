import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_650: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));

export class Seniority650 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC650> {
  getMotifs(): Motif[] {
    return MOTIFS_650;
  }
}
