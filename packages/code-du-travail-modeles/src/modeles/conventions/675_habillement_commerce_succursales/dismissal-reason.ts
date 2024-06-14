import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason675 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Licenciement cadres collectif ",
        rules: [
          {
            rule: "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . cadres . licenciement collectif question",
            value: "'Oui'",
          },
          {
            rule: "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . licenciement collectif question",
            value: "'Oui'",
          },
        ],
      },
      {
        name: "Licenciement cadres non collectif",
        rules: [
          {
            rule: "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . cadres . licenciement collectif question",
            value: "'Non'",
          },
          {
            rule: "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . licenciement collectif question",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
