import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason2216 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Autres licenciements",
        rules: [
          {
            rule: "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique",
            value: "'Non'",
          },
        ],
      },
      {
        name: "Licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
