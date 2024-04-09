import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason2120 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Licenciement économique",
        rules: [
          {
            rule: "contrat salarié . convention collective . banque . licenciement économique",
            value: "'Oui'",
          },
        ],
      },
      {
        name: "Licenciement disciplinaire",
        rules: [
          {
            rule: "contrat salarié . convention collective . banque . licenciement économique",
            value: "'Non'",
          },
          {
            rule: "contrat salarié . convention collective . banque . licenciement disciplinaire",
            value: "'Oui'",
          },
        ],
      },
      {
        name: "Autres licenciements",
        rules: [
          {
            rule: "contrat salarié . convention collective . banque . licenciement économique",
            value: "'Non'",
          },
          {
            rule: "contrat salarié . convention collective . banque . licenciement disciplinaire",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
