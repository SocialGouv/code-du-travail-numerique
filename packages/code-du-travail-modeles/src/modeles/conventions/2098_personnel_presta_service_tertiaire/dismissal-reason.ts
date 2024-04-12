import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason2098 implements IDismissalReason {
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
    ];
  }
}
