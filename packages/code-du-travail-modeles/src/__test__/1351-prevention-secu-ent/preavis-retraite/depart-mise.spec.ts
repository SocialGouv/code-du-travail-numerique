import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                                                           | expectedNotice
  ${1}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${6}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${1}
  ${24}     | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${1}      | ${"Agents de maîtrise"}                                            | ${2}
  ${6}      | ${"Agents de maîtrise"}                                            | ${1}
  ${24}     | ${"Agents de maîtrise"}                                            | ${2}
  ${1}      | ${"Cadres"}                                                        | ${3}
  ${6}      | ${"Cadres"}                                                        | ${1}
  ${24}     | ${"Cadres"}                                                        | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                                                           | expectedNotice
  ${1}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${6}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${24}     | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${1}      | ${"Agents de maîtrise"}                                            | ${2}
  ${6}      | ${"Agents de maîtrise"}                                            | ${2}
  ${24}     | ${"Agents de maîtrise"}                                            | ${2}
  ${1}      | ${"Cadres"}                                                        | ${3}
  ${6}      | ${"Cadres"}                                                        | ${3}
  ${24}     | ${"Cadres"}                                                        | ${3}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
