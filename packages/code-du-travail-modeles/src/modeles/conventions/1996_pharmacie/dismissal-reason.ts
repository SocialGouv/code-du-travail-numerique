import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason1996 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "autre licenciement",
        rules: [
          {
            rule: "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question",
            value: "'Non'",
          },
        ],
      },
      {
        name: "licenciement éco",
        rules: [
          {
            rule: "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
