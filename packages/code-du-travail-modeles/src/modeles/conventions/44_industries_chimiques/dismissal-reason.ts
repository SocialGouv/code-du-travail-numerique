import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason44 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
