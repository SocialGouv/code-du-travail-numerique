import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1702"
);

describe("Notification pour la CC 1702", () => {
  test("l'utilisateur est en arrêt de travail", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "40",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Non'`,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "10",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        "10",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "oui",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2500",
    });

    const notifications = engine.getNotifications();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      "Le montant de l’indemnité doit être calculé sur la base des salaires (reconstitués) que le salarié aurait dû percevoir au cours des 3 derniers mois précédant la rupture du contrat s’il n’avait pas été en arrêt de travail. Pour simplifier l'utilisation de ce simulateur, le calcul se base ici sur les salaires perçus avant l'arrêt travail et non sur les salaires reconstitués. Le montant de l'indemnité pourrait donc être plus important que celui donné par le simulateur."
    );
  });

  test("l'utilisateur est en licenciement économique", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "40",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique":
        "'Oui'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "10",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        "10",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2500",
    });

    const notifications = engine.getNotifications();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      "Ce résultat ne prend pas en compte le complément forfaitaire dont bénéficie le salarié en plus du montant de l'indemnité de licenciement lorsqu'il est licencié pour motif économique. Ce complément forfaitaire est égal à 70% du montant de l'indemnité de licenciement pour les salariés ayant entre 2 et 5 ans d'ancienneté et à 35% du salaire de référence du salarié (voir le détail du calcul) pour les salariés ayant au moins 5 ans d'ancienneté."
    );
  });
});
