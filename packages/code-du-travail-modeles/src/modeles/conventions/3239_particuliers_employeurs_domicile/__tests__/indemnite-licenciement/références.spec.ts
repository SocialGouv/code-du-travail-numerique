import SingletonEnginePublicodes from "../../../../../internal/SingletonEngine";
import { getReferences } from "../../../../common";
import { CatPro3239 } from "../../salary";

const engine = SingletonEnginePublicodes.getInstance();

const ReferencesPe = [
  {
    article: "Article 47-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942116?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942116",
  },
  {
    article: "Article 47-2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942117?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942117",
  },
  {
    article: "Article 48-1-3-1-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942139?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942139",
  },
  {
    article: "Article 48-1-3-4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942144?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942144",
  },
  {
    article: "Article 49",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942151?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942151",
  },
  {
    article: "Article 60",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942169?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942169",
  },
  {
    article: "Article 142",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942377?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942377",
  },
  {
    article: "Article 163-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942458?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942458",
  },
];

const ReferencesAssMat = [
  {
    article: "Article 47-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942116?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942116",
  },
  {
    article: "Article 47-2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942117?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942117",
  },
  {
    article: "Article 48-1-3-1-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942139?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942139",
  },
  {
    article: "Article 48-1-3-4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942144?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942144",
  },
  {
    article: "Article 49",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942151?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942151",
  },
  {
    article: "Article 60",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942169?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942169",
  },
  {
    article: "Article 90-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942236?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942236",
  },
  {
    article: "Article 121-1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942321?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942321",
  },
];

describe("Références juridiques pour la CC 3239", () => {
  test("Notifications de l'assistante maternelle", () => {
    const situation = engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3239'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires": 20000,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 2,
    });

    const result = getReferences(situation, "résultat conventionnel");

    expect(result).toHaveLength(ReferencesAssMat.length);
    expect(result).toEqual(expect.arrayContaining(ReferencesAssMat));
  });

  test("Notifications du salarié du particulier employeur", () => {
    const situation = engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3239'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.salarieParticulierEmployeur}'`,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 2,
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
    });

    const result = getReferences(situation, "résultat conventionnel");

    expect(result).toHaveLength(ReferencesPe.length);
    expect(result).toEqual(expect.arrayContaining(ReferencesPe));
  });
});
