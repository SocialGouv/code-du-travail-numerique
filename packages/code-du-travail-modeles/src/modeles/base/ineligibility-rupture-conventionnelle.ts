import type { IIndemniteDepartIneligibility } from "../common/types/ineligibility";

export class IneligibilityRuptureConventionnelle
  implements IIndemniteDepartIneligibility
{
  getContractIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args.typeContratTravail && args.typeContratTravail === "cdd") {
      return `
        <p>
          La rupture conventionnelle ne concerne pas les salariés en CDD ou en contrat d'intérim. 
          Sous certaines conditions, le salarié peut avoir le droit à une 
          <a href="/outils/indemnite-precarite">indemnité de précarité</a>.
        </p>
      `;
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
