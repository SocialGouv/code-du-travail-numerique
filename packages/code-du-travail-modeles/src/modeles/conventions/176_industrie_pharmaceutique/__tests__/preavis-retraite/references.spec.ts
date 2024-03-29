import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartRetraitePharmaReferences = [
  {
    article: "Article 37",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117113?idConteneur=KALICONT000005635184#KALIARTI000039117113",
  },
  {
    article: "Article 35.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
  },
];
const MiseRetraitePharmaReferences = [
  {
    article: "Article 35",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005857748?idConteneur=KALICONT000005635184",
  },
  {
    article: "Article 38",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000039117114/?idConteneur=KALICONT000005635184",
  },
];

const MiseRetraiteGroup1a3PharmaReferences = [
  {
    article: "Article 35",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109",
  },
  {
    article: "Article 38",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000039117114/?idConteneur=KALICONT000005635184",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraitePharmaReferences)}
  ${"départ"} | ${DepartRetraiteReferences.concat(DepartRetraitePharmaReferences)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "6",
      "contrat salarié . convention collective": "'IDCC0176'",
      "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
        "oui",
      "contrat salarié . convention collective . industrie pharmaceutique . groupe":
        "5",
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);

test("Vérification des références juridiques pour un employé du groupe 4 en mise à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC0176'",
    "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
      "non",
    "contrat salarié . convention collective . industrie pharmaceutique . groupe":
      "4",
    "contrat salarié . mise à la retraite": "oui",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  const expectedReferences = MiseRetraiteReferences.concat(
    MiseRetraitePharmaReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});

test("Vérification des références juridiques pour un employé du groupe 1 à 3 en mise à la retraite", () => {
  engine.setSituation({
    "contrat salarié . ancienneté": "6",
    "contrat salarié . convention collective": "'IDCC0176'",
    "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
      "non",
    "contrat salarié . convention collective . industrie pharmaceutique . groupe":
      "3",
    "contrat salarié . mise à la retraite": "oui",
    "contrat salarié . travailleur handicapé": "non",
  });
  const result = engine.getReferences();

  const expectedReferences = MiseRetraiteReferences.concat(
    MiseRetraiteGroup1a3PharmaReferences
  );
  expect(result).toHaveLength(expectedReferences.length);
  expect(result).toEqual(expect.arrayContaining(expectedReferences));
});
