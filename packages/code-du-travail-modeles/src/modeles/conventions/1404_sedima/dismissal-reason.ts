import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason1404 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Sans question cdi opération",
        rules: [
          {
            rule: "contrat salarié . convention collective . sedima . question cdi opération",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
