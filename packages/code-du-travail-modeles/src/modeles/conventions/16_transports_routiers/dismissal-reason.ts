import type {
  DismissalReason,
  IDismissalReason,
} from "../../common/types/dismissalReason";

export class DismissalReason16 implements IDismissalReason {
  dismissalTypes(): DismissalReason[] {
    return [
      {
        name: "Incapacité définitive à la conduite entraînant le retrait du permis de conduire pour inaptitude physique constatée par une commission médicale départementale",
        rules: [
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
            value: "'Oui'",
          },
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
            value: "'Oui'",
          },
        ],
      },
      {
        name: "Incapacité temporaire à la conduite",
        rules: [
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
            value: "'Oui'",
          },
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
            value: "'Non'",
          },
        ],
      },
      {
        name: "Autres licenciements",
        rules: [
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
            value: "'Non'",
          },
          {
            rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
            value: "'Non'",
          },
        ],
      },
    ];
  }
}
