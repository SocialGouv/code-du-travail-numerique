import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1672"
);

const notification = `Si lors de l’absence pour maladie non professionnelle le salarié a bénéficié d’une indemnisation complémentaire versée par l'employeur (en plus des indemnités journalières de la sécurité sociale), le montant de l’indemnité de licenciement pourrait être plus élevé. En effet, dans ce cas, la période d’absence (jusqu’à 1 an d’absence) est intégrée dans l’ancienneté du salarié.
Par soucis de simplification, ce simulateur déduit toutes les absences pour maladie non professionnelle sans distinguer, pour calculer l’ancienneté du salarié, selon qu’elles aient été indemnisées ou pas.
`;

describe("Notification pour la CC 1672", () => {
  describe("Si l'utilisateur ne sélectionne pas un congé non maladie professionnelle", () => {
    test("La notification ne doit pas remonter", () => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1672'",
        "contrat salarié . convention collective . sociétés d'assurances . age":
          "40",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres (Classes 1 à 4)'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "10",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "10",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "3000",
      });

      const notifications = engine.getNotifications();
      expect(notifications).toHaveLength(0);
    });
  });

  describe("Si l'utilisateur sélectionne un congé parental d'éducation à temps plein", () => {
    test("ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €", () => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1672'",
        "contrat salarié . convention collective . sociétés d'assurances . age":
          "40",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres (Classes 1 à 4)'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "10",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "10",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "3000",
        "contrat salarié . convention collective . sociétés d'assurances . congé maladie non professionnelle":
          "oui",
      });

      const notifications = engine.getNotifications();
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(notification);
    });
  });
});
