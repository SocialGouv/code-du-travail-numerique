import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

describe("CC 176", () => {
  test.each`
    seniority | group | afterFirstJuly | expectedNotice
    ${3}      | ${3}  | ${"non"}       | ${2}
    ${3}      | ${4}  | ${"non"}       | ${2}
    ${3}      | ${5}  | ${"non"}       | ${3}
    ${3}      | ${3}  | ${"oui"}       | ${2}
    ${3}      | ${4}  | ${"oui"}       | ${3}
    ${3}      | ${5}  | ${"oui"}       | ${3}
    ${3}      | ${6}  | ${"oui"}       | ${4}
    ${12}     | ${3}  | ${"non"}       | ${2}
    ${12}     | ${4}  | ${"non"}       | ${2}
    ${12}     | ${5}  | ${"non"}       | ${3}
    ${12}     | ${3}  | ${"oui"}       | ${2}
    ${12}     | ${4}  | ${"oui"}       | ${3}
    ${12}     | ${5}  | ${"oui"}       | ${3}
    ${12}     | ${6}  | ${"oui"}       | ${4}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat après le 1er juillet 2019: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
    ({ seniority, group, afterFirstJuly, expectedNotice }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0176'",
          "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
            afterFirstJuly,
          "contrat salarié . convention collective . industrie pharmaceutique . groupe":
            group,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        },
        "contrat salarié . préavis de retraite en jours"
      );

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual("mois");
      expect(missingArgs).toEqual([]);
    }
  );

  test.each`
    seniority | group | afterFirstJuly | expectedNotice
    ${3}      | ${4}  | ${"non"}       | ${2}
    ${3}      | ${5}  | ${"non"}       | ${3}
    ${3}      | ${2}  | ${"oui"}       | ${2}
    ${3}      | ${4}  | ${"oui"}       | ${3}
    ${3}      | ${5}  | ${"oui"}       | ${3}
    ${3}      | ${6}  | ${"oui"}       | ${4}
    ${12}     | ${4}  | ${"non"}       | ${1}
    ${12}     | ${5}  | ${"non"}       | ${1}
    ${12}     | ${2}  | ${"oui"}       | ${1}
    ${12}     | ${4}  | ${"oui"}       | ${1}
    ${12}     | ${5}  | ${"oui"}       | ${1}
    ${24}     | ${4}  | ${"non"}       | ${2}
    ${24}     | ${5}  | ${"non"}       | ${2}
    ${24}     | ${2}  | ${"oui"}       | ${2}
    ${24}     | ${4}  | ${"oui"}       | ${2}
    ${24}     | ${5}  | ${"oui"}       | ${2}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat après le 1er juillet 2019: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
    ({ seniority, group, afterFirstJuly, expectedNotice }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0176'",
          "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
            afterFirstJuly,
          "contrat salarié . convention collective . industrie pharmaceutique . groupe":
            group,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        },
        "contrat salarié . préavis de retraite en jours"
      );

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual("mois");
      expect(missingArgs).toEqual([]);
    }
  );

  test.each`
    group
    ${4}
    ${5}
    ${6}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat conclu après le 1er juillet 2019) lors d'un départ à la retraite, on attend une notification ($expectedNotification)",
    ({ group }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": "3",
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . groupe":
          group,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toEqual(
        "Cette durée ne s'applique que si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."
      );
    }
  );

  test.each`
    seniority | group | afterFirstJuly
    ${3}      | ${1}  | ${"non"}
    ${3}      | ${2}  | ${"non"}
    ${3}      | ${3}  | ${"non"}
    ${3}      | ${1}  | ${"oui"}
    ${3}      | ${2}  | ${"oui"}
    ${3}      | ${3}  | ${"oui"}
    ${12}     | ${4}  | ${"oui"}
    ${12}     | ${5}  | ${"oui"}
    ${12}     | ${6}  | ${"oui"}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat après le 1er juillet 2019: $afterFirstJuly) lors d'un départ à la retraite, on n'attend pas de notifications",
    ({ seniority, group, afterFirstJuly }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe":
          group,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(0);
    }
  );

  test.each`
    group
    ${4}
    ${5}
    ${6}
  `(
    "Pour une mise à la retraite avec un contrat conclu après le 1er juillet 2019 et un group $group, on attend une notification",
    ({ group }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": "3",
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . groupe":
          group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toEqual(
        "Cette durée ne s'applique que si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."
      );
    }
  );

  test.each`
    group | afterFirstJuly
    ${1}  | ${"oui"}
    ${2}  | ${"oui"}
    ${3}  | ${"oui"}
    ${4}  | ${"non"}
    ${5}  | ${"non"}
  `(
    "Pour une mise à la retraite avec une groupe $group (contrat conclu après le 1er juillet 2019: $afterFirstJuly), on n'attend pas de notification",
    ({ group, afterFirstJuly }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": "3",
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe":
          group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(0);
    }
  );
});
