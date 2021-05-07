import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | group | afterFirstJuly | expectedNotice
  ${3}      | ${4}  | ${"non"}       | ${2}
  ${3}      | ${5}  | ${"non"}       | ${3}
  ${3}      | ${2}  | ${"oui"}       | ${2}
  ${3}      | ${4}  | ${"oui"}       | ${3}
  ${3}      | ${5}  | ${"oui"}       | ${4}
  ${12}     | ${4}  | ${"non"}       | ${2}
  ${12}     | ${5}  | ${"non"}       | ${3}
  ${12}     | ${2}  | ${"oui"}       | ${2}
  ${12}     | ${4}  | ${"oui"}       | ${3}
  ${12}     | ${5}  | ${"oui"}       | ${4}
`(
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, group, afterFirstJuly, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);

test.each`
  seniority | group | afterFirstJuly | expectedNotice
  ${3}      | ${4}  | ${"non"}       | ${2}
  ${3}      | ${5}  | ${"non"}       | ${3}
  ${3}      | ${2}  | ${"oui"}       | ${2}
  ${3}      | ${4}  | ${"oui"}       | ${3}
  ${3}      | ${5}  | ${"oui"}       | ${4}
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
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, group, afterFirstJuly, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);

test.each`
  group | afterFirstJuly | expectedNotification
  ${4}  | ${"non"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
  ${5}  | ${"non"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
  ${6}  | ${"non"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
  ${4}  | ${"oui"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
  ${5}  | ${"oui"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
  ${6}  | ${"oui"}       | ${"Cette durée s'applique si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."}
`(
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) lors d'un départ à la retraite, on attend une notification ($expectedNotification)",
  ({ group, afterFirstJuly, expectedNotification }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": 3,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toEqual(expectedNotification);
  }
);

test.each`
  group | afterFirstJuly
  ${1}  | ${"non"}
  ${2}  | ${"non"}
  ${3}  | ${"non"}
  ${1}  | ${"oui"}
  ${2}  | ${"oui"}
  ${3}  | ${"oui"}
`(
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) lors d'un départ à la retraite, on n'attend pas de notifications",
  ({ group, afterFirstJuly, expectedNotification }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": 3,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
      })
    );

    expect(notifications).toHaveLength(0);
  }
);
