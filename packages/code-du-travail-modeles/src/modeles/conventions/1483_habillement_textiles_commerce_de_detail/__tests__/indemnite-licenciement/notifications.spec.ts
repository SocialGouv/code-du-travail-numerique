import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

const notif =
  "Conformément aux règles de la convention collective, le montant de l’indemnité pourrait être plus important si le salarié a perçu une indemnité compensatrice de congés payés et/ou une indemnité compensatrice de préavis.";

describe("Notifications juridique pour l'indemnité conventionnel de licenciement pour la CC 1483", () => {
  describe("Pour un non-cadres", () => {
    test.each`
      seniorityRight | seniority | salary  | expectedNotification
      ${1.01}        | ${8}      | ${2331} | ${notif}
      ${1.01}        | ${10}     | ${2331} | ${notif}
      ${1.01}        | ${18}     | ${2450} | ${notif}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedNotification",
      ({ seniority, seniorityRight, salary, expectedNotification }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Non-cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const notifications = engine.getNotifications();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toContain(expectedNotification);
      }
    );
  });

  describe("Pour un cadres", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedNotification
      ${49} | ${1.01}        | ${2}      | ${3040} | ${notif}
      ${49} | ${1.01}        | ${5}      | ${3040} | ${notif}
      ${49} | ${1.01}        | ${17}     | ${3040} | ${notif}
      ${51} | ${1.01}        | ${2}      | ${3040} | ${notif}
      ${51} | ${1.01}        | ${5}      | ${3040} | ${notif}
      ${51} | ${1.01}        | ${17}     | ${3040} | ${notif}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age => $expectedNotification",
      ({ seniority, seniorityRight, salary, expectedNotification, age }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . age":
              age,
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        const notifications = engine.getNotifications();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toContain(expectedNotification);
      }
    );
  });
});
