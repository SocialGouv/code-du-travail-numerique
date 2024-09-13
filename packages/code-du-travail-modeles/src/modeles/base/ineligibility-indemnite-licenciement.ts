import type { IIndemniteDepartIneligibility } from "../common/types/ineligibility";

export class IneligibilityLegalIndemniteLicenciement
  implements IIndemniteDepartIneligibility
{
  getContractIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    console.log("TOTO");
    if (args.typeContratTravail && args.typeContratTravail === "cdd") {
      return `
        <p>
          L’indemnité de licenciement ne concerne pas les salariés en CDD et en contrat de travail temporaire.
          Sous certaines conditions, le salarié peut avoir le droit à une 
          <a href="/outils/indemnite-precarite">indemnité de précarité</a>.
        </p>
      `;
    } else if (
      args.licenciementFauteGrave &&
      args.licenciementFauteGrave === "oui"
    ) {
      return "<p>L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde). Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.</p>";
    }
  }

  getSeniorityIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const ANCIENNETE_MINIALE_EN_ANNEE = 8 / 12;
    if (
      args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle"
      ] === "non" &&
      Math.max(
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté requise en année"
          ]
        ),
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
          ] ?? "0"
        )
      ) < ANCIENNETE_MINIALE_EN_ANNEE
    ) {
      return "<p>L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.</p>";
    }
  }

  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    return (
      this.getContractIneligibility(args) ??
      this.getSeniorityIneligibility(args)
    );
  }
}
