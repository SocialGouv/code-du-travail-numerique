import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const CommonReference = {
  article: "Article 51",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005786650/?idConteneur=KALICONT000005635444",
};

const DepartRetraiteJournalismeReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteJournalismeReferences = [
  ...MiseRetraiteReferences,
  CommonReference,
];

test.each`
  retirement  | seniority | expectedReferences
  ${"depart"} | ${5}      | ${DepartRetraiteJournalismeReferences}
  ${"depart"} | ${6}      | ${DepartRetraiteJournalismeReferences}
  ${"depart"} | ${24}     | ${DepartRetraiteJournalismeReferences}
  ${"mise"}   | ${5}      | ${MiseRetraiteJournalismeReferences}
  ${"mise"}   | ${6}      | ${MiseRetraiteJournalismeReferences}
  ${"mise"}   | ${24}     | ${MiseRetraiteJournalismeReferences}
`(
  "Vérification des références juridiques pour un employé avec une ancienneté de $seniority mois en $retirement à la retraite",
  ({ retirement, seniority, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1480'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
