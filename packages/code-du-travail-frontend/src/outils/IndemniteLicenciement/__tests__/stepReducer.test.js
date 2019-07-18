import { stepPrime, stepReducer, initialSteps } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialSteps).toMatchInlineSnapshot(`
Array [
  Object {
    "component": [Function],
    "label": "Introduction",
    "name": "introduction",
  },
  Object {
    "component": [Function],
    "label": "Informations générales",
    "name": "info_generales",
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
    "name": "indemnite_legale",
  },
]
`);
  });
});

describe("reducer", () => {
  it("handles reset action", () => {
    expect(stepReducer([], { type: "reset" })).toEqual(initialSteps);
  });
  it("handles add_step after salaires", () => {
    const initialSteps = [{ name: "salaires" }];
    const newState = stepReducer(initialSteps, {
      type: "add_step",
      payload: { insertAfter: "salaires", step: stepPrime }
    });

    expect(newState.findIndex(step => step.name === "primes")).toBe(1);
    expect(newState[1]).toEqual(stepPrime);
  });
  it("does not add step at all if there is no previous step that matches", () => {
    const initialSteps = [{}, {}];
    const newState = stepReducer(initialSteps, {
      type: "add_step",
      payload: { insertAfter: "salaires", step: stepPrime }
    });

    expect(newState.findIndex(step => step.name === stepPrime.name)).toEqual(0);
  });
  it("handles remove_step", () => {
    const initialSteps = [{}, stepPrime, {}];
    const newState = stepReducer(initialSteps, {
      type: "remove_step",
      payload: stepPrime.name
    });

    expect(newState.findIndex(step => step.name === stepPrime.name)).toEqual(
      -1
    );
  });
  it("does not fail when removing unexisting step", () => {
    const initialSteps = [{}];
    const newState = stepReducer(initialSteps, {
      type: "remove_step",
      payload: { insertAfter: "salaires", stepPrime }
    });

    expect(newState.findIndex(step => step.name === stepPrime.name)).toEqual(
      -1
    );
  });
  it("should handle add_branche", () => {
    const initialSteps = [];
    const newState = stepReducer(initialSteps, {
      type: "add_branche",
      payload: [{ name: "branche_1" }, { name: "branche_2" }]
    });

    expect(newState.filter(step => /branche/.test(step.name)).length).toEqual(
      2
    );
  });
  it("should not fail to remove_branche when steps are empty", () => {
    const initialSteps = [];
    const newState = stepReducer(initialSteps, {
      type: "remove_branche"
    });

    expect(newState.length).toEqual(0);
  });
  it("should handle remove_branche", () => {
    const initialSteps = [
      { name: "salaires" },
      { name: "branche_1" },
      { name: "branche_2" }
    ];
    const newState = stepReducer(initialSteps, {
      type: "remove_branche"
    });

    expect(newState.length).toEqual(1);
  });
});
