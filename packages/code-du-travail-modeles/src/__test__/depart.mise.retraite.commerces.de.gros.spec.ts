import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../index";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${5}      | ${0}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                | expectedNotice
  ${5}      | ${"Ouvriers"}           | ${3}
  ${6}      | ${"Ouvriers"}           | ${3}
  ${24}     | ${"Ouvriers"}           | ${3}
  ${5}      | ${"Employés"}           | ${3}
  ${6}      | ${"Employés"}           | ${3}
  ${24}     | ${"Employés"}           | ${3}
  ${5}      | ${"Agents de maîtrise"} | ${3}
  ${6}      | ${"Agents de maîtrise"} | ${3}
  ${24}     | ${"Agents de maîtrise"} | ${3}
  ${5}      | ${"Techniciens"}        | ${3}
  ${6}      | ${"Techniciens"}        | ${3}
  ${24}     | ${"Techniciens"}        | ${3}
  ${5}      | ${"Cadres"}             | ${6}
  ${6}      | ${"Cadres"}             | ${6}
  ${24}     | ${"Cadres"}             | ${6}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority
  ${5}
  ${6}
  ${24}
`(
  "Pour un employé possédant $seniority mois d'ancienneté en départ à la retraite, on doit afficher une notification",
  ({ seniority }) => {
    const result = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
      })
    );

    expect(result).toHaveLength(1);
    expect(result[0].description).toContain(
      `Pour les salariés qui relèvent de l'ancienne convention collective du commerce de gros de la confiserie, chocolaterie, biscuiterie et alimentation fine et des négociants-distributeurs de levure, la durée du préavis est égale à **3** mois, si le salarié`
    );
  }
);

test.each`
  seniority | category
  ${5}      | ${"Ouvriers"}
  ${6}      | ${"Ouvriers"}
  ${24}     | ${"Ouvriers"}
  ${5}      | ${"Employés"}
  ${6}      | ${"Employés"}
  ${24}     | ${"Employés"}
  ${5}      | ${"Agents de maîtrise"}
  ${6}      | ${"Agents de maîtrise"}
  ${24}     | ${"Agents de maîtrise"}
  ${5}      | ${"Techniciens"}
  ${6}      | ${"Techniciens"}
  ${24}     | ${"Techniciens"}
  ${5}      | ${"Cadres"}
  ${6}      | ${"Cadres"}
  ${24}     | ${"Cadres"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté en départ à la retraite, on ne doit pas afficher de notification",
  ({ seniority, category }) => {
    const result = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
      })
    );

    expect(result).toHaveLength(0);
  }
);
