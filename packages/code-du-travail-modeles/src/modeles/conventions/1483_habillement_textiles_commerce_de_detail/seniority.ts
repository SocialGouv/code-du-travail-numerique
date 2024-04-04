import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCc } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_1483: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));

export class Seniority1483 extends SeniorityDefault<SupportedCc.IDCC1483> {
  getMotifs(): Motif[] {
    return MOTIFS_1483;
  }
}
