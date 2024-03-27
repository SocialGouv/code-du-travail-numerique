import type { IInegibility } from "../common/types/ineligibility";

export class IneligibilityRuptureConventionnelle implements IInegibility {
  getContractIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args.typeContratTravail && args.typeContratTravail === "cdd") {
      return "L’indemnité de rupture conventionnelle n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.";
    }
  }

  getSeniorityIneligibility(): string | undefined {
    return undefined;
  }

  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligility = this.getContractIneligibility(args);
    if (contractIneligility) {
      return contractIneligility;
    }
  }
}
