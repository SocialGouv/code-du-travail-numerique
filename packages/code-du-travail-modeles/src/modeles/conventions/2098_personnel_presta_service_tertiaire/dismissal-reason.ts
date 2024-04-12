import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason2098 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "inaptitude suite à un accident non professionnelle",
        rules: [
          {
            rule: "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
            value: "'Oui'",
          },
          {
            rule: "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
