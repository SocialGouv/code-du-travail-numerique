import {
  publicodesStub,
  generateStore,
  publicodesData,
} from "../../__tests__/dummies";
import { initQuestions } from "../index";
import { MissingArgs } from "@socialgouv/modeles-social";
import { UpdateFormValues } from "../../utils";

describe("initQuestions", () => {
  const missing1: MissingArgs = {
    name: "question 1",
    indice: 12,
    rawNode: {
      nom: "question 1",
    },
  };
  const missing2: MissingArgs = {
    name: "question 2",
    indice: 5,
    rawNode: {
      nom: "question 2",
    },
  };
  const question1 = {
    name: missing1.name,
    rule: missing1.rawNode,
  };

  describe("on arrive sur la page d'information", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [missing1, missing2],
    });

    const store = generateStore(publicodes);
    const newState = initQuestions(store, mockRemoveQuestionFromForm);

    it("doit récupérer la prochaine question manquante et l'ajouter à la liste", () => {
      expect(newState.steps.informations.questions).toStrictEqual([question1]);
    });

    it("doit retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        { name: "infos" },
      ]);
    });
  });
});
