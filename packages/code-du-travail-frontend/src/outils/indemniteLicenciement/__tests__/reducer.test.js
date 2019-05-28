import { StepReducer, getInitialSteps } from "../reducer";

describe("getInitialSteps()", () => {
  it("should return default steps", () => {
    expect(getInitialSteps()).toMatchInlineSnapshot(`
Array [
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
]
`);
  });
});

describe("reducer", () => {
  it("should handle reset action", () => {
    const items = [{ label: "test" }];
    expect(StepReducer([], { type: "reset", payload: items })).toEqual(items);
  });
  it("should handle add_primes after salaires", () => {
    const initialSteps = [{ name: "salaires" }];
    const newState = StepReducer(initialSteps, { type: "add_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(1);
  });
  it("should handle add_primes after salaires", () => {
    const initialSteps = [];
    const newState = StepReducer(initialSteps, { type: "add_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(0);
  });
  it("should handle remove_primes", () => {
    const initialSteps = [];
    const newState = StepReducer(initialSteps, { type: "remove_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(-1);
  });
  it("should not fail when handle remove_primes", () => {
    const initialSteps = [];
    const newState = StepReducer(initialSteps, { type: "remove_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(-1);
  });
  it("should handle add_branche", () => {
    const initialSteps = [];
    const newState = StepReducer(initialSteps, {
      type: "add_branche",
      payload: [{ name: "branche_1" }, { name: "branche_2" }]
    });

    expect(newState.filter(step => /branche/.test(step.name)).length).toEqual(
      2
    );
  });
  it("should not fail to remove_branche when steps are empty", () => {
    const initialSteps = [];
    const newState = StepReducer(initialSteps, {
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
    const newState = StepReducer(initialSteps, {
      type: "remove_branche"
    });

    expect(newState.length).toEqual(1);
  });
});
