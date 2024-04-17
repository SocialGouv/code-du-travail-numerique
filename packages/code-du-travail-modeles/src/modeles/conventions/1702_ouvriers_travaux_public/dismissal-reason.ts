import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason1702 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Autres licenciements",
        rules: [
          {
            rule: "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique",
            value: "'Non'",
          },
        ],
      },
      {
        name: "Licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
