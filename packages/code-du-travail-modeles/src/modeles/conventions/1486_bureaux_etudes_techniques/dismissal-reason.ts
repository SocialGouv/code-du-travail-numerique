import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason1486 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "autre licenciement",
        rules: [
          {
            rule: "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement",
            value: "'Non'",
          },
        ],
      },
      {
        name: "licenciement éco",
        rules: [
          {
            rule: "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
