import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason1702 implements IDismissalReason {
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
    ];
  }
}
