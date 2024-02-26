import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3248"
);

describe("Notification bloquante pour la CC 3248", () => {
  test("La date de notification est avant le 01/01/2024", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3248'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
        "'A, B, C, D ou E'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
        "'Oui'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois":
        "non",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
        "'Non'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age":
        "30",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite":
        "'Oui'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "20",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        "20",
      "contrat salarié . indemnité de licenciement . date de notification":
        "31/12/2023",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
    });

    const notifications = engine.getNotifications();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      "Attention, comme le licenciement a été notifié avant le 01/01/2024, le montant de l'indemnité peut ne pas correspondre au résultat donné. En effet, jusqu'au 31/12/2023 ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie (IDCC 650) qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024. Si le licenciement a été notifié avant le 01/01/2024 et que le salarié dépendait de la convention spécifique aux ingénieurs et cadres de la métallurgie (IDCC 650) il faut sélectionner cette convention collective à l'étape n°3 du simulateur pour obtenir le résultat correspondant."
    );
    expect(notifications[0].show).toBe("légal et conventionnel");
  });

  test("le salarié est non cadre (catégorie A à E) + qu'il a renseigné une absence de plus de 12 mois continue parmi les congés suivant : congé pour création d'entreprise, congé sabbatique, congé sans solde", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3248'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
        "'A, B, C, D ou E'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
        "'Non'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois":
        "oui",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
        "'Non'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "20",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        "20",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
    });

    const notifications = engine.getNotifications();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      "Si le congé dont la durée continue supérieure à un an a été financé par un compte épargne-temps, le montant de l'indemnité pourrait être plus élevé. En effet, dans ce cas la durée de l'absence ne doit pas être retirée de l'ancienneté du salarié alors que notre simulateur retire ces absences."
    );
    expect(notifications[0].show).toBe("légal et conventionnel");
  });
});
