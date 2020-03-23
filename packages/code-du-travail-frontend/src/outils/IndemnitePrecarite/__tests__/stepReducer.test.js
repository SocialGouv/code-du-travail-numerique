import { stepReducer, initialState } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialState.steps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "info_cc" },
      { name: "info_generales" },
      { name: "remuneration" },
      { name: "indemnite" },
    ]);
  });
  it("handles reset action", () => {
    expect(stepReducer({}, { type: "reset" })).toEqual(initialState);
  });
  it("handles setIndex action", () => {
    expect(
      stepReducer(initialState, { type: "setStepIndex", payload: 1 })
    ).toEqual({ steps: initialState.steps, stepIndex: 1 });
  });
});
