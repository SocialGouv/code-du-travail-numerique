import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CadresReferences = {
  article:
    "Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV, article 18",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005849573/?idConteneur=KALICONT000005635624",
};

const OuvriersReferences = {
  article: "Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005849372/?idConteneur=KALICONT000005635624",
};

const EmployersReferences = {
  article:
    "Accord du 27 février 1951 relatif aux employés Annexe II, article 13",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005849509/?idConteneur=KALICONT000005635624",
};

const TAMReferences = {
  article:
    "Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe III, article 17",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005849262/?idConteneur=KALICONT000005635624",
};

test.each`
  retirement  | category                  | expectedReferences
  ${"mise"}   | ${"Ingénieurs et cadres"} | ${MiseRetraiteReferences.concat(CadresReferences)}
  ${"départ"} | ${"Ingénieurs et cadres"} | ${DepartRetraiteReferences.concat(CadresReferences)}
  ${"mise"}   | ${"Ouvriers"}             | ${MiseRetraiteReferences.concat(OuvriersReferences)}
  ${"départ"} | ${"Ouvriers"}             | ${DepartRetraiteReferences}
  ${"mise"}   | ${"Employés"}             | ${MiseRetraiteReferences.concat(EmployersReferences)}
  ${"départ"} | ${"Employés"}             | ${DepartRetraiteReferences}
  ${"mise"}   | ${"TAM"}                  | ${MiseRetraiteReferences.concat(TAMReferences)}
  ${"départ"} | ${"TAM"}                  | ${DepartRetraiteReferences}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "6",
      "contrat salarié . convention collective": "'IDCC0016'",
      "contrat salarié . convention collective . transports routiers . catégorie professionnelle": `'${category}'`,
      "contrat salarié . convention collective . transports routiers . catégorie professionnelle . TAM . groupe":
        "6",
      "contrat salarié . mise à la retraite":
        retirement === "mise" ? "oui" : "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
