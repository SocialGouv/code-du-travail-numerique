import {
  generateStore,
  publicodesData,
  publicodesStub,
} from "../../__tests__/dummies";
import { initialState } from "../../preavisRetraiteStore";
import { MissingArgs } from "@socialgouv/modeles-social";
import { computeNextQuestion } from "../index";
import { UpdateFormValues } from "../../utils";

describe("computeNextQuestion", () => {
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

  describe("l'utilisateur répond à la dernière question", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [],
    });

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2, question3],
        },
      },
    });
    const newState = computeNextQuestion(
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

  describe("l'utilisateur change sa réponse à la première question", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [missing2],
    });

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2, question3],
        },
      },
    });
    const newState = computeNextQuestion(
      store,
      mockRemoveQuestionFromForm,
      question1.name
    );

    it("doit retourner reposer la question 2 (et supprimer la 3)", () => {
      expect(newState.steps.informations.questions).toStrictEqual([
        question1,
        question2,
      ]);
    });

    it("doit retirer les réponses aux questions 2 et 3", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        { name: `infos.${question2.name}` },
        { name: `infos.${question3.name}` },
      ]);
    });
  });
});
