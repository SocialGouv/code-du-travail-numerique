import { ActionName } from "../../common/type/WizardType";
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
    expect(
      stepReducer(
        {
          stepIndex: 1,
          steps: [],
        },
        { type: ActionName.reset }
      )
    ).toEqual(initialState);
  });
  it("handles setIndex action", () => {
    expect(
      stepReducer(initialState, { payload: 1, type: ActionName.setStepIndex })
    ).toEqual({ stepIndex: 1, steps: initialState.steps });
  });
});
