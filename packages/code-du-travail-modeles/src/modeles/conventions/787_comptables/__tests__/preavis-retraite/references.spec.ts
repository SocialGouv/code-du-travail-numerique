import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
const DepartRetraite = [
  {
    article: "Article 6.2.4.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000029786918/?idConteneur=KALICONT000005635826",
  },
];

const MiseRetraite = [
  {
    article: "Article 6.2.0 et Article 6.2.4.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000029786918/?idConteneur=KALICONT000005635826",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraite)}
  ${"depart"} | ${DepartRetraiteReferences.concat(DepartRetraite)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "5",
      "contrat salarié . convention collective": "'IDCC0787'",
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
