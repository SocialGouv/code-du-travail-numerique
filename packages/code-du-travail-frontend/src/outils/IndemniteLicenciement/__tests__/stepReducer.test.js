import { initialState, stepPrime, stepReducer } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialState).toMatchInlineSnapshot(`
      Object {
        "stepIndex": 0,
        "steps": Array [
          Object {
            "component": [Function],
            "label": "Introduction",
            "name": "introduction",
          },
          Object {
            "component": [Function],
            "isForm": true,
            "label": "Contrat de travail",
            "name": "info_generales",
          },
          Object {
            "component": [Function],
            "isForm": true,
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
            "name": "indemnite_legale",
          },
        ],
      }
    `);
  });
});

describe("reducer", () => {
  it("handles reset action", () => {
    expect(stepReducer({}, { type: "reset" })).toEqual(initialState);
  });
  it("handles setIndex action", () => {
    expect(
      stepReducer(initialState, { payload: 1, type: "setStepIndex" })
    ).toEqual({ stepIndex: 1, steps: initialState.steps });
  });
  it("handles add_step after salaires", () => {
    const state = { stepIndex: 0, steps: [{ name: "salaires" }] };
    const newState = stepReducer(state, {
      payload: { insertAfter: "salaires", step: stepPrime },
      type: "add_step",
    });

    expect(newState.steps.findIndex((step) => step.name === "primes")).toBe(1);
    expect(newState.steps[1]).toEqual(stepPrime);
  });

  it("does not add step at all if there is no previous step that matches", () => {
    const state = { stepIndex: 0, steps: [{}, {}] };
    const newState = stepReducer(state, {
      payload: { insertAfter: "salaires", step: stepPrime },
      type: "add_step",
    });

    expect(
      newState.steps.findIndex((step) => step.name === stepPrime.name)
    ).toEqual(0);
  });

  it("handles remove_step", () => {
    const state = { stepIndex: 0, steps: [{}, stepPrime, {}] };
    const newState = stepReducer(state, {
      payload: stepPrime.name,
      type: "remove_step",
    });

    expect(
      newState.steps.findIndex((step) => step.name === stepPrime.name)
    ).toEqual(-1);
  });

  it("does not fail when removing unexisting step", () => {
    const state = { stepIndex: 0, steps: [{}] };
    const newState = stepReducer(state, {
      payload: { insertAfter: "salaires", stepPrime },
      type: "remove_step",
    });

    expect(
      newState.steps.findIndex((step) => step.name === stepPrime.name)
    ).toEqual(-1);
  });

  it("should handle add_branche", () => {
    const state = { stepIndex: 0, steps: [] };
    const newState = stepReducer(state, {
      payload: [{ name: "branche_1" }, { name: "branche_2" }],
      type: "add_branche",
    });

    expect(
      newState.steps.filter((step) => /branche/.test(step.name)).length
    ).toEqual(2);
  });

  it("should not fail to remove_branche when steps are empty", () => {
    const state = { stepIndex: 0, steps: [] };
    const newState = stepReducer(state, {
      type: "remove_branche",
    });

    expect(newState.steps.length).toEqual(0);
  });

  it("should handle remove_branche", () => {
    const state = {
      stepIndex: 0,
      steps: [
        { name: "salaires" },
        { name: "branche_1" },
        { name: "branche_2" },
      ],
    };
    const newState = stepReducer(state, {
      type: "remove_branche",
    });

    expect(newState.steps.length).toEqual(1);
  });
});
