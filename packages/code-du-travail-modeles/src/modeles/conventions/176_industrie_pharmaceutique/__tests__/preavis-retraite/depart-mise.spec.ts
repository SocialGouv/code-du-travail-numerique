import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import { getNotifications } from "../../../../common";

const engine = new Engine(modeles as any);

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
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
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
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
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
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 3,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

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
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

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
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 3,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toEqual(
      "Cette durée ne s'applique que si les salariés ne bénéficient pas des dispositions de l'article 4 de la convention collective nationale de retraite et de prévoyance des cadres du 14/3/1947."
    );
  }
);

test("Pour une mise à la retraite avec un contract conclu avant le 1er juillet 2009 et un groupe de 3, on attend une notification.", () => {
  const notifications = getNotifications(
    engine.setSituation({
      "contrat salarié . ancienneté": 3,
      "contrat salarié . convention collective": "'IDCC0176'",
      "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
        "non",
      "contrat salarié . convention collective . industrie pharmaceutique . groupe": 3,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    })
  );

  expect(notifications).toHaveLength(1);
  expect(notifications[0].description).toContain(
    "Attention : L'article de la convention collective ou la convention collective saisie n’a pas été étendue au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail."
  );
});

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
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 3,
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(notifications).toHaveLength(0);
  }
);
