import { initialState, stepReducer } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialState.steps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "info_cc" },
      { name: "infos" },
      { name: "results" },
    ]);
  });
  it("handles reset action", () => {
    expect(stepReducer({}, { type: "reset" })).toEqual(initialState);
  });
  it("handles setIndex action", () => {
    expect(
      stepReducer(initialState, { payload: 1, type: "setStepIndex" })
    ).toEqual({ stepIndex: 1, steps: initialState.steps });
  });
});
