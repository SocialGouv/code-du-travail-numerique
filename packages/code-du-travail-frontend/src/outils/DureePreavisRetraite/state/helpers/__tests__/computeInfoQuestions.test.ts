import {
  dummyPublicodes,
  generateStore,
  publicodesData,
} from "../../__tests__/dummies";
import { computeInfoQuestions } from "../index";
import { initialState } from "../../preavisRetraiteStore";
import { MissingArgs } from "@socialgouv/modeles-social";

describe("computeInfoQuestions", () => {
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
  const missing3: MissingArgs = {
    name: "question 3",
    indice: 13,
    rawNode: {
      nom: "question 3",
    },
  };
  const question1 = {
    name: missing1.name,
    rule: missing1.rawNode,
  };
  const question2 = {
    name: missing2.name,
    rule: missing2.rawNode,
  };
  const question3 = {
    name: missing3.name,
    rule: missing3.rawNode,
  };

  describe("on arrive sur la page d'information", () => {
    const mockRemoveQuestionFromForm = jest.fn((names: string[]): void => {});
    const publicodes = dummyPublicodes;
    publicodes.data = {
      ...publicodesData,
      missingArgs: [missing1, missing2],
    };

    const store = generateStore(publicodes);
    const newState = computeInfoQuestions(store, mockRemoveQuestionFromForm);

    it("doit récupérer la prochaine question manquante et l'ajouter à la liste", () => {
      expect(newState.steps.informations.questions).toStrictEqual([question1]);
    });

    it("doit retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual(["infos"]);
    });
  });

  describe("il n'y a plus de questions manquantes", () => {
    const mockRemoveQuestionFromForm = jest.fn(() => {});
    const publicodes = dummyPublicodes;
    publicodes.data = {
      ...publicodesData,
      missingArgs: [],
    };

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2, question3],
        },
      },
    });
    const newState = computeInfoQuestions(
      store,
      mockRemoveQuestionFromForm,
      question3.name
    );

    it("doit retourner la même liste de questions", () => {
      expect(newState.steps.informations.questions).toStrictEqual(
        store.steps.informations.questions
      );
    });

    it("ne doit pas retirer du form des réponses", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(0);
    });
  });

  describe("il change sa réponse à la première question", () => {
    const mockRemoveQuestionFromForm = jest.fn((names: string[]): void => {});
    const publicodes = dummyPublicodes;
    publicodes.data = {
      ...publicodesData,
      missingArgs: [missing2],
    };

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2, question3],
        },
      },
    });
    const newState = computeInfoQuestions(
      store,
      mockRemoveQuestionFromForm,
      question1.name
    );

    it("doit retourner la première question et la question suivante (la dernière doit être supprimé)", () => {
      expect(newState.steps.informations.questions).toStrictEqual([
        question1,
        question2,
      ]);
    });

    it("doit retirer du form les réponses aux questions 2 et 3", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        `infos.${question2.name}`,
        `infos.${question3.name}`,
      ]);
    });
  });
});
