import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import { getNotifications } from "../../../../common";

const engine = new Engine(modeles as any);

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
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'${category}'`,
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
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'Cadres administratifs et de gestion'`,
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . coefficient": coefficient,
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
  seniority | category                                 | coefficient
  ${5}      | ${"Non-cadres"}                          | ${0}
  ${6}      | ${"Non-cadres"}                          | ${0}
  ${24}     | ${"Non-cadres"}                          | ${0}
  ${5}      | ${"Directeurs généraux"}                 | ${0}
  ${6}      | ${"Directeurs généraux"}                 | ${4}
  ${24}     | ${"Directeurs généraux"}                 | ${6}
  ${5}      | ${"Directeurs"}                          | ${4}
  ${6}      | ${"Directeurs"}                          | ${4}
  ${24}     | ${"Directeurs"}                          | ${6}
  ${5}      | ${"Directeurs-adjoints"}                 | ${4}
  ${6}      | ${"Directeurs-adjoints"}                 | ${4}
  ${24}     | ${"Directeurs-adjoints"}                 | ${6}
  ${5}      | ${"Gestionnaires"}                       | ${4}
  ${6}      | ${"Gestionnaires"}                       | ${4}
  ${24}     | ${"Gestionnaires"}                       | ${6}
  ${5}      | ${"Médecins"}                            | ${4}
  ${6}      | ${"Médecins"}                            | ${4}
  ${24}     | ${"Médecins"}                            | ${6}
  ${5}      | ${"Pharmaciens"}                         | ${4}
  ${6}      | ${"Pharmaciens"}                         | ${4}
  ${24}     | ${"Pharmaciens"}                         | ${6}
  ${5}      | ${"Biologistes"}                         | ${4}
  ${6}      | ${"Biologistes"}                         | ${4}
  ${24}     | ${"Biologistes"}                         | ${6}
  ${5}      | ${"Autres cadres"}                       | ${4}
  ${6}      | ${"Autres cadres"}                       | ${4}
  ${24}     | ${"Autres cadres"}                       | ${4}
  ${5}      | ${"Cadres administratifs et de gestion"} | ${714}
  ${6}      | ${"Cadres administratifs et de gestion"} | ${714}
  ${24}     | ${"Cadres administratifs et de gestion"} | ${714}
  ${5}      | ${"Cadres administratifs et de gestion"} | ${715}
  ${6}      | ${"Cadres administratifs et de gestion"} | ${715}
  ${24}     | ${"Cadres administratifs et de gestion"} | ${715}
`(
  "Pour un employé d'un départ à la retraite, on attend une notification",
  ({ seniority, category, coefficient }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . coefficient": coefficient,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(notifications).toHaveLength(0);
  }
);
