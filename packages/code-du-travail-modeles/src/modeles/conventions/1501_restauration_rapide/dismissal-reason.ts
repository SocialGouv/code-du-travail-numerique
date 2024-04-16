import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason1501 implements IDismissalReason {
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
