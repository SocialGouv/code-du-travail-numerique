import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const HandicapeReferences = {
  article: "Article L5213-9",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006903707/",
};

describe("Travailleur handicapé - Références départ et mise à la retraite", () => {
  test.each`
    retirement  | expectedReferences
    ${"mise"}   | ${MiseRetraiteReferences.concat(HandicapeReferences)}
    ${"depart"} | ${DepartRetraiteReferences.concat(HandicapeReferences)}
  `(
    "Vérification des références juridiques pour un employé handicapé en case de $retirement à la retraite",
    ({ retirement, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . ancienneté": "24",
          "contrat salarié . convention collective": "''",
          "contrat salarié . mise à la retraite":
            retirement === "mise" ? "oui" : "non",
          "contrat salarié . travailleur handicapé": "oui",
        })
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
