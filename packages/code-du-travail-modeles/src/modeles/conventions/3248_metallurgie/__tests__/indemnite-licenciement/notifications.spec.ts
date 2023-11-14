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
        "'ABCDE'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
        "'Oui'",
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
      "Attention, comme le licenciement a été notifié avant le 01/01/2024, le montant de l'indemnité peut ne pas correspondre au résultat donné. En effet, jusqu'au 31/12/2023 ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie (IDCC 650) qui s’appliquaient. Toutes ces conventions ont été regroupées pour former la convention collective nationale de la métallurgie (IDCC 3248) applicable depuis le 01/01/2024. Si le licenciement a été notifié avant le 01/01/2024 et que le salarié dépendait de la convention spécifique aux ingénieurs et cadres de la métallurgie (IDCC 650) il faut sélectionner cette convention collective à l'étape n°3 du simulateur pour obtenir le résultat correspondant."
    );
    expect(notifications[0].show).toBe("légal et conventionnel");
  });
});
