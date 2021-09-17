// import Engine from "publicodes";
// import { mergeModels } from "../internal/merger";

// const engine = new Engine(mergeModels());

// test.each`
//   seniority | category                              | expectedNotice
//   ${1}      | ${"Employés et ouvriers"}             | ${0}
//   ${6}      | ${"Employés et ouvriers"}             | ${1}
//   ${24}     | ${"Employés et ouvriers"}             | ${2}
//   ${1}      | ${"Techniciens & Agents de maîtrise"} | ${0}
//   ${6}      | ${"Techniciens & Agents de maîtrise"} | ${1}
//   ${24}     | ${"Techniciens & Agents de maîtrise"} | ${2}
//   ${1}      | ${"Cadres"}                           | ${2}
//   ${6}      | ${"Cadres"}                           | ${2}
//   ${24}     | ${"Cadres"}                           | ${2}
// `(
//   "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
//   ({ seniority, category, expectedNotice }) => {
//     const result = engine
//       .setSituation({
//         "contrat salarié . convention collective": "'IDCC2216'",
//         "contrat salarié . ancienneté": seniority,
//         "contrat salarié . mise à la retraite": "non",
//         "contrat salarié . travailleur handicapé": "non",
//         "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
//       })
//       .evaluate("contrat salarié . préavis de retraite");

//     expect(result.nodeValue).toEqual(expectedNotice);
//     expect(result.unit?.numerators).toEqual(["mois"]);
//     expect(result.missingVariables).toEqual({});
//   }
// );

// test.each`
//   seniority | category                              | expectedNotice
//   ${1}      | ${"Employés et ouvriers"}             | ${2}
//   ${6}      | ${"Employés et ouvriers"}             | ${2}
//   ${24}     | ${"Employés et ouvriers"}             | ${2}
//   ${1}      | ${"Techniciens & Agents de maîtrise"} | ${1}
//   ${6}      | ${"Techniciens & Agents de maîtrise"} | ${1}
//   ${24}     | ${"Techniciens & Agents de maîtrise"} | ${2}
//   ${1}      | ${"Cadres"}                           | ${6}
//   ${6}      | ${"Cadres"}                           | ${6}
//   ${24}     | ${"Cadres"}                           | ${6}
// `(
//   "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
//   ({ seniority, category, expectedNotice }) => {
//     const result = engine
//       .setSituation({
//         "contrat salarié . convention collective": "'IDCC2216'",
//         "contrat salarié . ancienneté": seniority,
//         "contrat salarié . mise à la retraite": "oui",
//         "contrat salarié . travailleur handicapé": "non",
//         "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
//       })
//       .evaluate("contrat salarié . préavis de retraite");

//     expect(result.nodeValue).toEqual(expectedNotice);
//     expect(result.unit?.numerators).toEqual(["mois"]);
//     expect(result.missingVariables).toEqual({});
//   }
// );
