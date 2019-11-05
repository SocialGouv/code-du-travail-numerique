import { stepReducer, initialSteps } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialSteps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "situation" },
      { name: "info_cc" },
      { name: "infos" },
      { name: "results" }
    ]);
  });
  it("handles reset action", () => {
    expect(stepReducer([{ name: "foo" }], { type: "reset" })).toEqual(
      initialSteps
    );
  });
});
