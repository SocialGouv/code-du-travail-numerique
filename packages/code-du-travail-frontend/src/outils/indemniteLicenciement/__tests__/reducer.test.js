import { stepReducer, getInitialStepsState } from "../stepReducer";

describe("getInitialStepsState()", () => {
  it("should return default steps", () => {
    expect(getInitialStepsState()).toMatchInlineSnapshot(`
Object {
  "currentStepIndex": 0,
  "steps": Array [
    Object {
      "component": [Function],
      "label": "Informations générales",
      "name": "infoGenerales",
    },
    Object {
      "component": [Function],
      "label": "Ancienneté",
      "name": "anciennete",
    },
    Object {
      "component": [Function],
      "label": "Salaires",
      "name": "salaires",
    },
    Object {
      "component": [Function],
      "label": "Indemnité légale",
      "name": "indemniteLegale",
    },
  ],
}
`);
  });
});

describe("reducer", () => {
  it("should handle reset action", () => {
    const resetPayload = {
      currentStepIndex: 0,
      steps: [{ label: "mock" }]
    };
    const newState = stepReducer({}, { type: "reset", payload: resetPayload });

    expect(newState).toEqual(resetPayload);
  });

  it("should handle next_step action", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: [{ label: "step1" }, { label: "step2" }]
    };
    const newState = stepReducer(initialState, { type: "next_step" });

    expect(newState.currentStepIndex).toEqual(1);
  });

  it("should ignore next_step action if already at the end", () => {
    const initialState = {
      currentStepIndex: 1,
      steps: [{ label: "step1" }, { label: "step2" }]
    };
    const newState = stepReducer(initialState, { type: "next_step" });
    expect(newState.currentStepIndex).toEqual(1);
  });

  it("should handle previous_step action", () => {
    const initialState = {
      currentStepIndex: 1,
      steps: [{ label: "step1" }, { label: "step2" }]
    };
    const newState = stepReducer(initialState, { type: "previous_step" });

    expect(newState.currentStepIndex).toEqual(0);
  });
  it("should ignore previous_step action if already at the beggining", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: [{ label: "step1" }, { label: "step2" }]
    };
    const newState = stepReducer(initialState, { type: "previous_step" });

    expect(newState.currentStepIndex).toEqual(0);
  });

  it("should handle add_primes after salaires", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: [{ name: "salaires" }]
    };
    const newState = stepReducer(initialState, { type: "add_primes" });

    expect(newState.steps.findIndex(step => step.name === "primes")).toEqual(1);
  });
  it("should handle remove_primes", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: [{ name: "primes" }]
    };
    const newState = stepReducer(initialState, { type: "remove_primes" });

    expect(newState.steps.findIndex(step => step.name === "primes")).toEqual(
      -1
    );
  });
  it("should not fail when handle remove_primes", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: []
    };
    const newState = stepReducer(initialState, { type: "remove_primes" });

    expect(newState.steps.findIndex(step => step.name === "primes")).toEqual(
      -1
    );
  });
  it("should handle add_branche", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: []
    };
    const newState = stepReducer(initialState, {
      type: "add_branche",
      payload: [{ name: "branche_1" }, { name: "branche_2" }]
    });

    expect(
      newState.steps.filter(step => /branche/.test(step.name)).length
    ).toEqual(2);
  });
  it("should not fail to remove_branche when steps are empty", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: []
    };
    const newState = stepReducer(initialState, {
      type: "remove_branche"
    });

    expect(newState.steps.length).toEqual(0);
  });
  it("should handle remove_branche", () => {
    const initialState = {
      currentStepIndex: 0,
      steps: [
        { name: "salaires" },
        { name: "branche_1" },
        { name: "branche_2" }
      ]
    };
    const newState = stepReducer(initialState, {
      type: "remove_branche"
    });

    expect(newState.steps.length).toEqual(1);
  });
});
