import {
  generateStore,
  publicodesData,
  publicodesStub,
} from "../../__tests__/dummies";
import { initialState } from "../../preavisRetraiteStore";
import { MissingArgs } from "@socialgouv/modeles-social";
import { computeNextQuestion } from "../index";

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

  describe("l'utilisateur a répondu à la première question", () => {
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [missing2, missing3],
    });

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1],
        },
      },
    });
    const newState = computeNextQuestion(store);

    it("doit retourner la question 1 et 2", () => {
      expect(newState.steps.informations.questions).toStrictEqual([
        question1,
        question2,
      ]);
    });
  });

  describe("l'utilisateur a changé la réponse à la première question", () => {
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [missing2, missing3],
    });

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2],
        },
      },
    });
    const newState = computeNextQuestion(store);

    it("doit retourner la question 1 et 2", () => {
      expect(newState.steps.informations.questions).toStrictEqual([
        question1,
        question2,
      ]);
    });
  });

  describe("l'utilisateur a répondu à la deuxième question", () => {
    const publicodes = publicodesStub({
      ...publicodesData,
      missingArgs: [missing3],
    });

    const store = generateStore(publicodes, {
      ...initialState,
      steps: {
        ...initialState.steps,
        informations: {
          questions: [question1, question2],
        },
      },
    });
    const newState = computeNextQuestion(store);

    it("doit retourner la question 1, 2 et 3", () => {
      expect(newState.steps.informations.questions).toStrictEqual([
        question1,
        question2,
        question3,
      ]);
    });
  });

  describe("l'utilisateur a répondu à toute les questions", () => {
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
    const newState = computeNextQuestion(store);

    it("doit retourner la même liste de questions", () => {
      expect(newState.steps.informations.questions).toStrictEqual(
        store.steps.informations.questions
      );
    });
  });
});
