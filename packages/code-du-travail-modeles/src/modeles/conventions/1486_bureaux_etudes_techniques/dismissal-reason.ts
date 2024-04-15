import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason1486 implements IDismissalReason {
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
