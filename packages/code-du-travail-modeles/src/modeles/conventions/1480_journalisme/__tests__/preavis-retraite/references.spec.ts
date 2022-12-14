import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const CommonReference = {
  article: "Article 51",
  url:
    "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005786650/?idConteneur=KALICONT000005635444",
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
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
