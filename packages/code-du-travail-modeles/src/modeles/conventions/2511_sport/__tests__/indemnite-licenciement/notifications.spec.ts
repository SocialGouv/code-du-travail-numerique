import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2511"
);

const notification = `Si lors de l’absence pour maladie non professionnelle le salarié a bénéficié d’une indemnisation complémentaire versée par l'employeur (maintien de salaire), en plus des indemnités journalières de la sécurité sociale, le montant de l’indemnité de licenciement pourrait être plus élevé. En effet, dans ce cas, la période d’absence (jusqu’à 3 mois d’absence par période de 12 mois) est intégrée dans l’ancienneté du salarié.
Par soucis de simplification, ce simulateur déduit toutes les absences pour maladie non professionnelle sans distinguer, pour calculer l’ancienneté du salarié, selon qu’elles ont été indemnisées ou pas.`;

describe("Notification pour la CC 2511", () => {
  describe("Si l'utilisateur ne sélectionne pas un congé parental d'éducation à temps plein", () => {
    test.each`
      seniority | salary
      ${0}      | ${2000}
      ${8 / 12} | ${2000}
      ${2}      | ${2000}
      ${10}     | ${2000}
      ${12}     | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ seniority, salary }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2511'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const notifications = engine.getNotifications();
        expect(notifications).toHaveLength(0);
      }
    );
  });

  describe("Si l'utilisateur sélectionne un congé parental d'éducation à temps plein", () => {
    test.each`
      seniority | salary
      ${0}      | ${2000}
      ${8 / 12} | ${2000}
      ${2}      | ${2000}
      ${10}     | ${2000}
      ${12}     | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ seniority, salary }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2511'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . avec congé maladie non professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const notifications = engine.getNotifications();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toContain(notification);
      }
    );
  });
});
