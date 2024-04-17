import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason573 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question",
            value: "'Oui'",
          },
        ],
      },
      {
        name: "Autres licenciements",
        rules: [
          {
            rule: "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
