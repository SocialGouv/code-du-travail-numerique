import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | category                  | expectedNotice | expectedUnit
  ${3}      | ${"Ingénieurs et cadres"} | ${6}           | ${"mois"}
  ${12}     | ${"Ingénieurs et cadres"} | ${1}           | ${"mois"}
  ${23}     | ${"Ingénieurs et cadres"} | ${1}           | ${"mois"}
  ${24}     | ${"Ingénieurs et cadres"} | ${2}           | ${"mois"}
  ${25}     | ${"Ingénieurs et cadres"} | ${2}           | ${"mois"}
  ${3}      | ${"Employés"}             | ${0}           | ${"semaines"}
  ${6}      | ${"Employés"}             | ${1}           | ${"mois"}
  ${23}     | ${"Employés"}             | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}             | ${2}           | ${"mois"}
  ${25}     | ${"Employés"}             | ${2}           | ${"mois"}
  ${3}      | ${"Ouvriers"}             | ${0}           | ${"semaines"}
  ${6}      | ${"Ouvriers"}             | ${1}           | ${"mois"}
  ${23}     | ${"Ouvriers"}             | ${1}           | ${"mois"}
  ${24}     | ${"Ouvriers"}             | ${2}           | ${"mois"}
  ${25}     | ${"Ouvriers"}             | ${2}           | ${"mois"}
  ${3}      | ${"TAM"}                  | ${0}           | ${"semaines"}
  ${6}      | ${"TAM"}                  | ${1}           | ${"mois"}
  ${23}     | ${"TAM"}                  | ${1}           | ${"mois"}
  ${24}     | ${"TAM"}                  | ${2}           | ${"mois"}
  ${25}     | ${"TAM"}                  | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être de $expectedNotice mois",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority.toString(),
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | category                  | group | expectedNotice | expectedUnit
  ${5}      | ${"Ingénieurs et cadres"} | ${0}  | ${6}           | ${"mois"}
  ${6}      | ${"Ingénieurs et cadres"} | ${0}  | ${6}           | ${"mois"}
  ${24}     | ${"Ingénieurs et cadres"} | ${0}  | ${6}           | ${"mois"}
  ${3}      | ${"Ouvriers"}             | ${0}  | ${1}           | ${"semaine"}
  ${6}      | ${"Ouvriers"}             | ${0}  | ${1}           | ${"mois"}
  ${23}     | ${"Ouvriers"}             | ${0}  | ${1}           | ${"mois"}
  ${24}     | ${"Ouvriers"}             | ${0}  | ${2}           | ${"mois"}
  ${25}     | ${"Ouvriers"}             | ${0}  | ${2}           | ${"mois"}
  ${0}      | ${"Employés"}             | ${0}  | ${0}           | ${"semaines"}
  ${1}      | ${"Employés"}             | ${0}  | ${1}           | ${"mois"}
  ${23}     | ${"Employés"}             | ${0}  | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}             | ${0}  | ${2}           | ${"mois"}
  ${25}     | ${"Employés"}             | ${0}  | ${2}           | ${"mois"}
  ${0}      | ${"TAM"}                  | ${5}  | ${0}           | ${"semaines"}
  ${1}      | ${"TAM"}                  | ${5}  | ${1}           | ${"mois"}
  ${23}     | ${"TAM"}                  | ${5}  | ${1}           | ${"mois"}
  ${24}     | ${"TAM"}                  | ${5}  | ${2}           | ${"mois"}
  ${25}     | ${"TAM"}                  | ${5}  | ${2}           | ${"mois"}
  ${1}      | ${"TAM"}                  | ${6}  | ${2}           | ${"mois"}
  ${25}     | ${"TAM"}                  | ${6}  | ${2}           | ${"mois"}
`(
  "Pour un $category ($group) possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être de $expectedNotice $expectedUnit",
  ({ seniority, category, group, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle . TAM . groupe": group,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test("Pour un employé dans les transports routiers avec la catgorie TAM dans le groupe 6 lors d'une mise à la retraite, on attend la notification", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "5",
    "contrat salarié . convention collective": "'IDCC0016'",
    "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'TAM'`,
    "contrat salarié . convention collective . transports routiers . catégorie professionnelle . TAM . groupe":
      "6",
    "contrat salarié . mise à la retraite": "oui",
    "contrat salarié . travailleur handicapé": "non",
  });
  const notifications = engine.getNotifications();
  expect(notifications).toHaveLength(1);
  expect(notifications[0].description).toBe(
    `Le salarié pourra quitter son emploi après avoir exécuté un préavis de 1 mois sous réserve d’en avoir informé son employeur au moins 10 jours à l’avance.`
  );
});

test.each`
  seniority | category                  | group
  ${5}      | ${"Ingénieurs et cadres"} | ${0}
  ${6}      | ${"Ingénieurs et cadres"} | ${0}
  ${24}     | ${"Ingénieurs et cadres"} | ${0}
  ${3}      | ${"Ouvriers"}             | ${0}
  ${6}      | ${"Ouvriers"}             | ${0}
  ${23}     | ${"Ouvriers"}             | ${0}
  ${24}     | ${"Ouvriers"}             | ${0}
  ${25}     | ${"Ouvriers"}             | ${0}
  ${0}      | ${"Employés"}             | ${0}
  ${1}      | ${"Employés"}             | ${0}
  ${23}     | ${"Employés"}             | ${0}
  ${24}     | ${"Employés"}             | ${0}
  ${25}     | ${"Employés"}             | ${0}
  ${0}      | ${"TAM"}                  | ${5}
  ${1}      | ${"TAM"}                  | ${5}
  ${23}     | ${"TAM"}                  | ${5}
  ${24}     | ${"TAM"}                  | ${5}
  ${25}     | ${"TAM"}                  | ${5}
`(
  "Pour un employé dans les transports routiers de la catégorie $category dans le groupe $group lors d'une mise à la retraite, on n'attend pas de notification",
  ({ seniority, group, category }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC0016'",
      "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'${category}'`,
      "contrat salarié . convention collective . transports routiers . catégorie professionnelle . TAM . groupe": group,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const notifications = engine.getNotifications();

    expect(notifications).toHaveLength(0);
  }
);
