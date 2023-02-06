import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | category                | expectedNotice
  ${5}      | ${"Ouvriers"}           | ${1}
  ${6}      | ${"Ouvriers"}           | ${1}
  ${23}     | ${"Ouvriers"}           | ${1}
  ${24}     | ${"Ouvriers"}           | ${1}
  ${5}      | ${"Employés"}           | ${1}
  ${6}      | ${"Employés"}           | ${1}
  ${23}     | ${"Employés"}           | ${1}
  ${24}     | ${"Employés"}           | ${1}
  ${5}      | ${"Agents de maîtrise"} | ${1}
  ${6}      | ${"Agents de maîtrise"} | ${1}
  ${23}     | ${"Agents de maîtrise"} | ${1}
  ${24}     | ${"Agents de maîtrise"} | ${1}
  ${5}      | ${"Techniciens"}        | ${1}
  ${6}      | ${"Techniciens"}        | ${1}
  ${23}     | ${"Techniciens"}        | ${1}
  ${24}     | ${"Techniciens"}        | ${1}
  ${5}      | ${"Cadres"}             | ${3}
  ${6}      | ${"Cadres"}             | ${1}
  ${23}     | ${"Cadres"}             | ${1}
  ${24}     | ${"Cadres"}             | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0275'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle": `'${category}'`,
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
  seniority | category                | expectedNotice
  ${5}      | ${"Ouvriers"}           | ${1}
  ${6}      | ${"Ouvriers"}           | ${1}
  ${23}     | ${"Ouvriers"}           | ${1}
  ${24}     | ${"Ouvriers"}           | ${2}
  ${5}      | ${"Employés"}           | ${1}
  ${6}      | ${"Employés"}           | ${1}
  ${23}     | ${"Employés"}           | ${1}
  ${24}     | ${"Employés"}           | ${2}
  ${5}      | ${"Agents de maîtrise"} | ${1}
  ${6}      | ${"Agents de maîtrise"} | ${1}
  ${23}     | ${"Agents de maîtrise"} | ${1}
  ${24}     | ${"Agents de maîtrise"} | ${2}
  ${5}      | ${"Techniciens"}        | ${1}
  ${6}      | ${"Techniciens"}        | ${1}
  ${23}     | ${"Techniciens"}        | ${1}
  ${24}     | ${"Techniciens"}        | ${2}
  ${5}      | ${"Cadres"}             | ${3}
  ${6}      | ${"Cadres"}             | ${3}
  ${23}     | ${"Cadres"}             | ${3}
  ${24}     | ${"Cadres"}             | ${3}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0275'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle": `'${category}'`,
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
