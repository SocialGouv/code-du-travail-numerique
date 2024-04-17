import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason2216 extends DismissalReasonDefault {
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
