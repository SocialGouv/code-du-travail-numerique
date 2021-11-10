import Engine from "publicodes";

import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

describe("Validation de la présence des descriptions pour afficher des aides", () => {
  describe.each`
    title                          | expectedDescription
    ${"Catégorie professionnelle"} | ${"La catégorie professionnelle du salarié est habituellement mentionnée sur le **bulletin de salaire**."}
    ${"Échelon"}                   | ${"L'échelon du salarié est habituellement mentionné sur le **bulletin de salaire**."}
    ${"Groupe"}                    | ${"Le groupe du salarié est habituellement mentionné sur le **bulletin de salaire**."}
    ${"Coefficient"}               | ${"La coefficient du salarié est habituellement mentionné sur le **bulletin de salaire**."}
    ${"Niveau"}                    | ${"Le niveau du salarié est habituellement mentionné sur le **bulletin de salaire**."}
  `(
    "Vérification de la présence d'une description pour les questions $title",
    ({ title, expectedDescription }) => {
      const categoryRules = Object.values(engine.getParsedRules()).filter(
        (rule) => rule.title === title
      );
      it(`doit avoir au moins une règle de type ${title}`, () => {
        expect(categoryRules.length).toBeGreaterThan(0);
      });

      categoryRules.forEach((rule) => {
        it(`${rule.dottedName} doit avoir une description`, () => {
          expect(rule.rawNode.description).toBe(expectedDescription);
        });
      });
    }
  );
});
