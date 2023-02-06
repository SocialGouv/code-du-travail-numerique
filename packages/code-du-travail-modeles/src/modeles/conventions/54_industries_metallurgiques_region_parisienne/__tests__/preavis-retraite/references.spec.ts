import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const MiseRetraiteCCReferences = [
  {
    article: "Article 34 bis de l'avenant mensuel",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036772209/?idConteneur=KALICONT000005635149",
  },
  {
    article: "Article 11 bis de l'accord national du 10 juillet 1970",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023173509?idConteneur=KALICONT000005635602",
  },
];

const DepartRetraiteCCReferences = [
  {
    article: "Article 34 de l'avenant mensuel",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000032062291/?idConteneur=KALICONT000005635149",
  },
  {
    article: "Article 11 de l'accord national du 10 juillet 1970",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023173503",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraiteCCReferences)}
  ${"depart"} | ${DepartRetraiteReferences.concat(DepartRetraiteCCReferences)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "5",
      "contrat salarié . convention collective": "'IDCC0054'",
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
