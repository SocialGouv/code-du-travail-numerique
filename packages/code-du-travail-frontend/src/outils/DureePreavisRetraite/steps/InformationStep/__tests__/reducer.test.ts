import { informationReducer } from "../index";
import { CommonActionName } from "../../../../Components/Simulator/types";
import { MissingArgs } from "../../../../publicodes";
import { publicodesDummy, stateDummy } from "../../__tests__/dummies";

describe("Information reducer", () => {
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
    answered: false,
    name: missing1.name,
    rule: missing1.rawNode,
  };
  const question2 = {
    answered: false,
    name: missing2.name,
    rule: missing2.rawNode,
  };

  describe("on arrive sur la page d'information", () => {
    const state = {
      ...stateDummy,
    };
    const publicodes = {
      ...publicodesDummy,
      missingArgs: [missing1, missing2],
    };
    const newState = informationReducer(
      state,
      {
        type: CommonActionName.changeStep,
        payload: {
          currentStep: {
            step: state.steps[1],
            index: 1,
          },
          values: {},
        },
      },
      publicodes
    );

    it("doit récupérer la prochaine question manquante et l'ajouter à la liste", () => {
      expect(newState.informations.questions).toStrictEqual([
        {
          answered: false,
          name: missing1.name,
          rule: missing1.rawNode,
        },
      ]);
    });
  });

  describe("on revient sur la page d'information avec des infos saisies", () => {
    const state = {
      ...stateDummy,
      informations: {
        questions: [question1, question2],
      },
    };
    const publicodes = {
      ...publicodesDummy,
    };
    const newState = informationReducer(
      state,
      {
        type: CommonActionName.changeStep,
        payload: {
          currentStep: {
            step: state.steps[1],
            index: 1,
          },
          values: {},
        },
      },
      publicodes
    );

    it("doit retrouver la même liste de question", () => {
      expect(newState.informations.questions).toStrictEqual(
        state.informations.questions
      );
    });
  });

  describe("l'utilisateur revient sur l'écran sans avoir répondu à la dernière question (back)", () => {
    const state = {
      ...stateDummy,
      informations: {
        questions: [question1, question2],
      },
    };
    const publicodes = {
      ...publicodesDummy,
    };
    const newState = informationReducer(
      state,
      {
        type: CommonActionName.changeStep,
        payload: {
          currentStep: {
            step: state.steps[1],
            index: 1,
          },
          values: {},
        },
      },
      publicodes
    );

    it("doit retrouver la même liste de question", () => {
      expect(newState.informations.questions).toStrictEqual(
        state.informations.questions
      );
    });
  });
});
