import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                 | expectedNotice
  ${5}      | ${"Non-cadres"}          | ${3}
  ${6}      | ${"Non-cadres"}          | ${3}
  ${24}     | ${"Non-cadres"}          | ${3}
  ${5}      | ${"Directeurs généraux"} | ${4}
  ${6}      | ${"Directeurs généraux"} | ${4}
  ${24}     | ${"Directeurs généraux"} | ${6}
  ${5}      | ${"Directeurs"}          | ${4}
  ${6}      | ${"Directeurs"}          | ${4}
  ${24}     | ${"Directeurs"}          | ${6}
  ${5}      | ${"Directeurs-adjoints"} | ${4}
  ${6}      | ${"Directeurs-adjoints"} | ${4}
  ${24}     | ${"Directeurs-adjoints"} | ${6}
  ${5}      | ${"Gestionnaires"}       | ${4}
  ${6}      | ${"Gestionnaires"}       | ${4}
  ${24}     | ${"Gestionnaires"}       | ${6}
  ${5}      | ${"Médecins"}            | ${4}
  ${6}      | ${"Médecins"}            | ${4}
  ${24}     | ${"Médecins"}            | ${6}
  ${5}      | ${"Pharmaciens"}         | ${4}
  ${6}      | ${"Pharmaciens"}         | ${4}
  ${24}     | ${"Pharmaciens"}         | ${6}
  ${5}      | ${"Biologistes"}         | ${4}
  ${6}      | ${"Biologistes"}         | ${4}
  ${24}     | ${"Biologistes"}         | ${6}
  ${5}      | ${"Autres cadres"}       | ${4}
  ${6}      | ${"Autres cadres"}       | ${4}
  ${24}     | ${"Autres cadres"}       | ${4}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être de $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . mise à la retraite": "oui",
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
  ${5}      | ${714}      | ${4}
  ${6}      | ${714}      | ${4}
  ${24}     | ${714}      | ${4}
  ${5}      | ${715}      | ${4}
  ${6}      | ${715}      | ${4}
  ${24}     | ${715}      | ${6}
`(
  "Pour un Cadres administratifs et de gestion possédant (coefficient: $coefficient) $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être de $expectedNotice mois",
  ({ seniority, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . mise à la retraite": "oui",
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
