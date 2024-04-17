import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason1501 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "autre licenciement",
        rules: [
          {
            rule: "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique",
            value: "'Non'",
          },
        ],
      },
      {
        name: "licenciement éco",
        rules: [
          {
            rule: "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
