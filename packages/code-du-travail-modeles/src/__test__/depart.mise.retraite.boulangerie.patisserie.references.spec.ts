import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const DepartRetraite = [
  ...DepartRetraiteReferences,
  {
    article: "Article 34.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732935/?idConteneur=KALICONT000005635886",
  },
];

const DepartRetraiteMoins6Mois = [
  ...DepartRetraite, 
  {
    article: "Article 32",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005873153/?idConteneur=KALICONT000005635886",
  },
];

const MiseRetraite = [
  ...MiseRetraiteReferences,
  {
    article: "Article 34.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000030582626/?idConteneur=KALICONT000005635886",
  },
];

const MiseRetraiteMoins6Mois = [
  ...MiseRetraite,
  {
    article: "Article 32",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732933/?idConteneur=KALICONT000005635886",
  },
];

const engine = new Engine(mergeModels());

test.each`
  retirement  | seniority | expectedReferences
  ${"depart"} | ${5}      | ${DepartRetraiteMoins6Mois}
  ${"depart"} | ${6}      | ${DepartRetraite}
  ${"depart"} | ${24}     | ${DepartRetraite}
  ${"mise"}   | ${5}      | ${MiseRetraiteMoins6Mois}
  ${"mise"}   | ${6}      | ${MiseRetraite}
  ${"mise"}   | ${24}     | ${MiseRetraite}
`(
  "Vérification des références juridiques pour un employé avec une ancienneté de $seniority mois en $retirement à la retraite",
  ({ retirement, seniority, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0843'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
