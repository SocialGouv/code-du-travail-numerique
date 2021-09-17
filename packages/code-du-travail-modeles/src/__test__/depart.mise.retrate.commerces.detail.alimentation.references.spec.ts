// import Engine from "publicodes";
// import { mergeModels } from "../internal/merger";
// import {
//   DepartRetraiteReferences,
//   MiseRetraiteReferences,
// } from "./common/LegalReferences";
// import { getReferences } from "../utils/GetReferences";

// const engine = new Engine(mergeModels());

// const MiseRetraiteOuvriersReferences = [
//   ...MiseRetraiteReferences,
//   {
//     article: "Article 3.12",
//     url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023307000/?idConteneur=KALICONT000005635085",
//   },
//   {
//     article: "Article 3 de l'annexe I",
//     url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517472/?idConteneur=KALICONT000005635085",
//   },
// ];

// const MiseRetraiteTechniciensReferences = [
//   ...MiseRetraiteReferences,
//   {
//     article: "Article 5.1 de l'annexe II",
//     url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517514/?idConteneur=KALICONT000005635085",
//   },
// ];

// const MiseEtDepartRetraiteCadresReferences = [
//   ...MiseRetraiteReferences,
//   {
//     article: "Article 9 de l'annexe III",
//     url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517573/?idConteneur=KALICONT000005635085",
//   },
// ];
 

// test.each`
//   retirement  | category                              | expectedReferences
//   ${"départ"} | ${"Employés et ouvriers"}             | ${DepartRetraiteReferences}
//   ${"départ"} | ${"Techniciens & Agents de maîtrise"} | ${DepartRetraiteReferences}
//   ${"départ"} | ${"Cadres"}                           | ${MiseEtDepartRetraiteCadresReferences}
//   ${"mise"}   | ${"Employés et ouvriers"}             | ${MiseRetraiteOuvriersReferences}
//   ${"mise"}   | ${"Techniciens & Agents de maîtrise"} | ${MiseRetraiteTechniciensReferences}
//   ${"mise"}   | ${"Cadres"}                           | ${MiseEtDepartRetraiteCadresReferences}
// `(
//   "Vérification des références juridiques pour un $category en $retirement à la retraite",
//   ({ retirement, category, expectedReferences }) => {
//     const result = getReferences(
//       engine.setSituation({
//         "contrat salarié . convention collective": "'IDCC2216'",
//         "contrat salarié . mise à la retraite":
//           retirement === "mise" ? "oui" : "non",
//         "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
//         "contrat salarié . travailleur handicapé": "non",
//       })
//     );

//     expect(result).toHaveLength(expectedReferences.length);
//     expect(result).toEqual(expect.arrayContaining(expectedReferences));
//   }
// );
