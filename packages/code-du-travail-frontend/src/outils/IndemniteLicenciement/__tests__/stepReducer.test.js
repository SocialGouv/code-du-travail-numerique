import { stepReducer, initialSteps } from "../stepReducer";

describe("getInitialSteps()", () => {
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
    expect(stepReducer([], { type: "reset" })).toEqual(initialSteps);
  });
  it("should handle add_primes after salaires", () => {
    const initialSteps = [{ name: "salaires" }];
    const newState = stepReducer(initialSteps, { type: "add_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(1);
  });
  it("should handle add_primes after salaires", () => {
    const initialSteps = [];
    const newState = stepReducer(initialSteps, { type: "add_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(0);
  });
  it("should handle remove_primes", () => {
    const initialSteps = [];
    const newState = stepReducer(initialSteps, { type: "remove_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(-1);
  });
  it("should not fail when handle remove_primes", () => {
    const initialSteps = [];
    const newState = stepReducer(initialSteps, { type: "remove_primes" });

    expect(newState.findIndex(step => step.name === "primes")).toEqual(-1);
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
