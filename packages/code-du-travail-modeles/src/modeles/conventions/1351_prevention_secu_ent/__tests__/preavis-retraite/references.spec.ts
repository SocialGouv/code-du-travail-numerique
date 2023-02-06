import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartRetraiteExploitationReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 6.14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article:
      "Annexe IV : Agents d'exploitation, employés administratifs et techniciens, article 10",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853822/?idConteneur=KALICONT000005635405",
  },
];

const DepartRetraiteMaitriseReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 6.14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article: "Annexe V : Agents de maîtrise, article 9",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853833/?idConteneur=KALICONT000005635405",
  },
];

const DepartRetraiteCadresReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 6.14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article: "Annexe VI : Cadres, article 10",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853845/?idConteneur=KALICONT000005635405",
  },
];

const MiseRetraiteExploitationsReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 6.13",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article:
      "Annexe IV : Agents d'exploitation, employés administratifs et techniciens, article 10",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853822/?idConteneur=KALICONT000005635405",
  },
];

const MiseRetraiteMaitriseReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 6.13",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article: "Annexe V : Agents de maîtrise, article 9",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853833/?idConteneur=KALICONT000005635405",
  },
];

const MiseRetraiteCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 6.13",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021994236/?idConteneur=KALICONT000005635405",
  },
  {
    article: "Annexe VI : Cadres, article 10",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005853845/?idConteneur=KALICONT000005635405",
  },
];

test.each`
  retirement  | category                                                           | expectedReferences
  ${"départ"} | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${DepartRetraiteExploitationReferences}
  ${"départ"} | ${"Agents de maîtrise"}                                            | ${DepartRetraiteMaitriseReferences}
  ${"départ"} | ${"Cadres"}                                                        | ${DepartRetraiteCadresReferences}
  ${"mise"}   | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${MiseRetraiteExploitationsReferences}
  ${"mise"}   | ${"Agents de maîtrise"}                                            | ${MiseRetraiteMaitriseReferences}
  ${"mise"}   | ${"Cadres"}                                                        | ${MiseRetraiteCadresReferences}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC1351'",
      "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
