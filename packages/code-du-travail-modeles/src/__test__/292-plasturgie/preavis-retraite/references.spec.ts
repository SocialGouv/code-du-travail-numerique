import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const CadreReferences = [
  {
    article: "Article 28",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005856351/?idConteneur=KALICONT000005635856",
  },
  {
    article: "Article 8 de l'Avenant Cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005856728/?idConteneur=KALICONT000005635856",
  },
];

const CollaborateursReferences = [
  {
    article: "Article 28",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005856351/?idConteneur=KALICONT000005635856",
  },
  {
    article:
      'Article 15 de l\'Avenant "Ouvriers, collaborateurs, employés, techniciens, dessinateurs et agents de maîtrise"',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005856709/?idConteneur=KALICONT000005635856",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(CadreReferences)}
  ${"depart"} | ${DepartRetraiteReferences.concat(CadreReferences)}
`(
  "Vérification des références juridiques pour un cadre en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 1,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Cadres'",
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

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(CollaborateursReferences)}
  ${"depart"} | ${DepartRetraiteReferences.concat(CollaborateursReferences)}
`(
  "Vérification des références juridiques pour un collaborateur en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 1,
        "contrat salarié . convention collective": "'IDCC0292'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle":
          "'Collaborateurs'",
        "contrat salarié . convention collective . plasturgie . catégorie professionnelle . Collaborateurs . coefficient": 800,
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
