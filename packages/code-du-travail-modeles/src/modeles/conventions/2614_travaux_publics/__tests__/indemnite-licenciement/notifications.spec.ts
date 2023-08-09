import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2614"
);

const notifications = [
  {
    description: `Si le salarié a perçu une prime de vacances ou une indemnité de congés payés au cours des 12 mois précédant la notification du licenciement, le montant de l’indemnité de licenciement pourrait être moins élevé. En effet, la convention collective prévoit que l’indemnité doit être calculée sur la base du salaire sans ces éléments de rémunération, alors que le simulateur les intègre.`,
  },
];

describe("CC 2614", () => {
  describe("Affichage des notifications de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | salaireRef | age   | expectedNotification
      ${0}           | ${0}      | ${2624}    | ${0}  | ${notifications}
      ${1.5}         | ${2}      | ${2624}    | ${54} | ${notifications}
      ${2}           | ${15}     | ${2624}    | ${54} | ${notifications}
      ${2}           | ${24}     | ${2624}    | ${54} | ${notifications}
      ${1.5}         | ${2}      | ${2624}    | ${59} | ${notifications}
      ${2}           | ${15}     | ${2624}    | ${59} | ${notifications}
      ${2}           | ${24}     | ${2624}    | ${59} | ${notifications}
      ${2}           | ${40}     | ${2624}    | ${59} | ${notifications}
      ${1.5}         | ${2}      | ${2624}    | ${67} | ${notifications}
      ${2}           | ${15}     | ${2624}    | ${67} | ${notifications}
      ${2}           | ${24}     | ${2624}    | ${67} | ${notifications}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef €, age $age => on attend les notifications $expectedNotification",
      ({
        salaireRef,
        seniority,
        seniorityRight,
        age,
        expectedNotification,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2614'",
            "contrat salarié . convention collective . travaux publics . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const notifs = engine.getNotifications();
        expect(notifs).toHaveLength(expectedNotification.length);
        const notifsToCompare = notifs.map((notif) => {
          return {
            description: notif.description,
          };
        });
        expect(notifsToCompare).toEqual(expectedNotification);
      }
    );
  });
});
