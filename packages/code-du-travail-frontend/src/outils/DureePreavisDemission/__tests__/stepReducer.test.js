import { stepReducer, initialSteps } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialSteps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "infos" },
      { name: "results" }
    ]);
  });
  it("handles reset action", () => {
    expect(stepReducer([{ name: "foo" }], { type: "reset" })).toEqual(
      initialSteps
    );
  });

  it("handles add_branche", () => {
    const initialSteps = [{ name: "salaires" }, { name: "result" }];
    const newState = stepReducer(initialSteps, {
      type: "add_branche",
      payload: [{ name: "branche_foo" }, { name: "branche_bar" }]
    });
    expect(newState.map(({ name }) => ({ name }))).toEqual([
      { name: "salaires" },
      { name: "branche_foo" },
      { name: "branche_bar" }
    ]);
  });

  it("handles remove_branche", () => {
    const initialSteps = [{ name: "foo" }, { name: "branche_foo" }];
    const newState = stepReducer(initialSteps, { type: "remove_branche" });
    expect(newState.map(({ name }) => ({ name }))).toEqual([
      { name: "foo" },
      { name: "result" }
    ]);
  });
});
