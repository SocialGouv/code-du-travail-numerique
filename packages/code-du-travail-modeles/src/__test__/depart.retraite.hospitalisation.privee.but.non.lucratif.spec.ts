import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                 | expectedNotice
  ${5}      | ${"Non-cadres"}          | ${1}
  ${6}      | ${"Non-cadres"}          | ${1}
  ${24}     | ${"Non-cadres"}          | ${1}
  ${5}      | ${"Directeurs généraux"} | ${2}
  ${6}      | ${"Directeurs généraux"} | ${1}
  ${24}     | ${"Directeurs généraux"} | ${2}
  ${5}      | ${"Directeurs"}          | ${2}
  ${6}      | ${"Directeurs"}          | ${1}
  ${24}     | ${"Directeurs"}          | ${2}
  ${5}      | ${"Directeurs-adjoints"} | ${2}
  ${6}      | ${"Directeurs-adjoints"} | ${1}
  ${24}     | ${"Directeurs-adjoints"} | ${2}
  ${5}      | ${"Gestionnaires"}       | ${2}
  ${6}      | ${"Gestionnaires"}       | ${1}
  ${24}     | ${"Gestionnaires"}       | ${2}
  ${5}      | ${"Médecins"}            | ${2}
  ${6}      | ${"Médecins"}            | ${1}
  ${24}     | ${"Médecins"}            | ${2}
  ${5}      | ${"Pharmaciens"}         | ${2}
  ${6}      | ${"Pharmaciens"}         | ${1}
  ${24}     | ${"Pharmaciens"}         | ${2}
  ${5}      | ${"Biologistes"}         | ${2}
  ${6}      | ${"Biologistes"}         | ${1}
  ${24}     | ${"Biologistes"}         | ${2}
  ${5}      | ${"Autres cadres"}       | ${2}
  ${6}      | ${"Autres cadres"}       | ${1}
  ${24}     | ${"Autres cadres"}       | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être de $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | coefficient | expectedNotice
  ${5}      | ${714}      | ${2}
  ${6}      | ${714}      | ${1}
  ${24}     | ${714}      | ${2}
  ${5}      | ${715}      | ${2}
  ${6}      | ${715}      | ${1}
  ${24}     | ${715}      | ${2}
`(
  "Pour un Cadres administratifs et de gestion possédant (coefficient: $coefficient) $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être de $expectedNotice mois",
  ({ seniority, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'Cadres administratifs et de gestion'`,
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . coefficient": coefficient,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
