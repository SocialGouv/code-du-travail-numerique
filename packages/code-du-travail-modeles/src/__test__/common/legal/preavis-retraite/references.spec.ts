import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";
import { getReferences } from "../../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../legal-references";

const engine = new Engine(mergeModels());

test.each`
  retirement  | seniority | expectedReferences
  ${"depart"} | ${5}      | ${DepartRetraiteReferences}
  ${"depart"} | ${6}      | ${DepartRetraiteReferences}
  ${"depart"} | ${24}     | ${DepartRetraiteReferences}
  ${"mise"}   | ${5}      | ${MiseRetraiteReferences}
  ${"mise"}   | ${6}      | ${MiseRetraiteReferences}
  ${"mise"}   | ${24}     | ${MiseRetraiteReferences}
`(
  "Vérification des références juridiques pour un employé avec une ancienneté de $seniority mois en $retirement à la retraite",
  ({ retirement, seniority, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
