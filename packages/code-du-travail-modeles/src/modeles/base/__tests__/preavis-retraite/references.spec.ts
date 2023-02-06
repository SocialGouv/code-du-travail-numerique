import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

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
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
