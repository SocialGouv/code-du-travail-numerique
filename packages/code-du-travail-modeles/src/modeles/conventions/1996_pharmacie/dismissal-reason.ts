import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason1996 implements IDismissalReason {
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
    ];
  }
}
