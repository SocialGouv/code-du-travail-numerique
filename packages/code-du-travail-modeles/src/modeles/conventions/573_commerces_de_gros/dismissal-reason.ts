import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason573 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "licenciement économique",
        rule: "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question",
        value: "'Oui'",
      },
      {
        name: "Autres licenciements",
        rule: "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question",
        value: "'Non'",
      },
    ];
  }
}
