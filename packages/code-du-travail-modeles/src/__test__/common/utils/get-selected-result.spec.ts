import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getSelectedResult } from "../../../utils/GetSelectedResult";

const engine = new Engine(mergeModels());

describe("Get Selected Result", () => {
  test("Suite au resultat, nous pouvons récupérer les références liées à ce resultat", () => {
    const situation = engine.setSituation({
      "contrat salarié . ancienneté": 6,
      "contrat salarié . convention collective": "'IDCC0086'",
      "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'Employés (coefficients 120 à 215 inclus)'`,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const selectedResult = getSelectedResult(situation);

    expect(selectedResult).toEqual({
      rawNode: {
        "applicable si": {
          "toutes ces conditions": [
            "mise à la retraite",
            "catégorie professionnelle = 'Employés (coefficients 120 à 215 inclus)'",
          ],
        },
        cdtn: {
          "valeur maximale": "3 mois",
        },
        grille: {
          assiette: "ancienneté",
          tranches: [
            {
              montant: "1 mois",
              plafond: "24 mois",
            },
            {
              montant: "2 mois",
            },
          ],
        },
        nom: "contrat salarié . convention collective . publicité française . catégorie professionnelle . mise à la retraite d'un employé",
        remplace: "préavis de retraite collective",
        références: {
          "Article 30":
            "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005857304?idConteneur=KALICONT000005635",
          "Article 32.2":
            "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832772/?idConteneur=KALICONT000005635630",
        },
      },
    });
  });
});
