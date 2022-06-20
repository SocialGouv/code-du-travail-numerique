import { SalaireReference1596 } from "./1596_batiment_ouvriers_employes";
import { SalaireReferenceLegal } from "./legal";
import type { LegalReferenceSalaryProps } from "./types";
import { SupportedCcIndemniteLicenciement } from "./types";

export class SalaireReference {
  private readonly idcc: SupportedCcIndemniteLicenciement;

  constructor(idcc: SupportedCcIndemniteLicenciement) {
    this.idcc = idcc;
  }

  compute<T extends LegalReferenceSalaryProps>(args: T): number {
    switch (this.idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1596:
        return new SalaireReference1596().computeReferenceSalary(args);
      default:
        return new SalaireReferenceLegal().computeReferenceSalary(args);
    }
  }
}

export * from "./types";
