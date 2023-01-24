import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

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
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
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
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
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
