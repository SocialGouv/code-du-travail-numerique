import { DismissalReasonDefault } from "../../common/dismissal-reason";
import type { DismissalReason } from "../../common/types/dismissalReason";

export class DismissalReason2098 extends DismissalReasonDefault {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "autre licenciement",
        rules: [
          {
            rule: "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
            value: "'Non'",
          },
        ],
      },
      {
        name: "Licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
            value: "'Oui'",
          },
        ],
      },
    ];
  }
}
