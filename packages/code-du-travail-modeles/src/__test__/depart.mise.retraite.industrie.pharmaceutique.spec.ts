import Engine from "publicodes";
import { mergeModels } from "../utils/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | group | afterFirstJuly | expectedNotice
  ${3}      | ${4}  | ${"non"}        | ${2}
  ${3}      | ${5}  | ${"non"}        | ${3}
  ${3}      | ${2}  | ${"oui"}        | ${2}
  ${3}      | ${4}  | ${"oui"}        | ${3}
  ${3}      | ${5}  | ${"oui"}        | ${4}
  ${12}     | ${4}  | ${"non"}        | ${2}
  ${12}     | ${5}  | ${"non"}        | ${3}
  ${12}     | ${2}  | ${"oui"}        | ${2}
  ${12}     | ${4}  | ${"oui"}        | ${3}
  ${12}     | ${5}  | ${"oui"}        | ${4}
`(
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, group, afterFirstJuly, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);

test.each`
  seniority | group | afterFirstJuly | expectedNotice
  ${3}      | ${4}  | ${"non"}        | ${2}
  ${3}      | ${5}  | ${"non"}        | ${3}
  ${3}      | ${2}  | ${"oui"}        | ${2}
  ${3}      | ${4}  | ${"oui"}        | ${3}
  ${3}      | ${5}  | ${"oui"}        | ${4}
  ${12}     | ${4}  | ${"non"}        | ${1}
  ${12}     | ${5}  | ${"non"}        | ${1}
  ${12}     | ${2}  | ${"oui"}        | ${1}
  ${12}     | ${4}  | ${"oui"}        | ${1}
  ${12}     | ${5}  | ${"oui"}        | ${1}
  ${24}     | ${4}  | ${"non"}        | ${2}
  ${24}     | ${5}  | ${"non"}        | ${2}
  ${24}     | ${2}  | ${"oui"}        | ${2}
  ${24}     | ${4}  | ${"oui"}        | ${2}
  ${24}     | ${5}  | ${"oui"}        | ${2}
`(
  "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat avant le 1er juillet 1979: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, group, afterFirstJuly, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019": afterFirstJuly,
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": group
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
  }
);
