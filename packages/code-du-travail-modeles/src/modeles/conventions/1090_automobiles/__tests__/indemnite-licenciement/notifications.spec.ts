import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1090"
);

const notification =
  "Si le congé parental a été pris entre le 23/07/2011 et le 31/12/2013, le montant de l’indemnité pourrait être plus important car l’ancienneté retenue peut-être plus importante.";

describe("Notification pour la CC 1090", () => {
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
          "contrat salarié . convention collective": "'IDCC1090'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
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
          "contrat salarié . convention collective": "'IDCC1090'",
          "contrat salarié . convention collective . automobiles . indemnité de licenciement . congé parental d'éducation à temps plein":
            "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const notifications = engine.getNotifications();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toBe(notification);
      }
    );
  });
});
