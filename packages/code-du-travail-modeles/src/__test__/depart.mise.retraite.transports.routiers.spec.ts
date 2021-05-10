import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                  | expectedNotice
  ${3}      | ${"Ingénieurs et Cadres"} | ${6}
  ${12}     | ${"Ingénieurs et Cadres"} | ${1}
  ${23}     | ${"Ingénieurs et Cadres"} | ${1}
  ${24}     | ${"Ingénieurs et Cadres"} | ${2}
  ${25}     | ${"Ingénieurs et Cadres"} | ${2}
  ${3}      | ${"Autres salariés"}      | ${0}
  ${6}      | ${"Autres salariés"}      | ${1}
  ${23}     | ${"Autres salariés"}      | ${1}
  ${24}     | ${"Autres salariés"}      | ${2}
  ${25}     | ${"Autres salariés"}      | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être de $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);
