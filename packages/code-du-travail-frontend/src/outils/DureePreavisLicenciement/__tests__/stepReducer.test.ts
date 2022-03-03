import { generateAgreement } from "../../../../test/generateAgreement";
import { ActionName, SkipFn } from "../../common/type/WizardType";
import { initialState, stepReducer } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialState.steps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "situation" },
      { name: "info_cc" },
      { name: "infos" },
      { name: "results" },
    ]);
  });
  it("handles reset action", () => {
    expect(
      stepReducer(
        {
          stepIndex: 4,
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

  describe("Skip the information steps", () => {
    const informationStep = initialState.steps.filter(
      (step) => step.name == "infos"
    )[0];

    it("should contains an information step", () => {
      expect(informationStep).toBeDefined();
    });

    it("should define a skip function", () => {
      expect(informationStep.skip).toBeDefined();
    });

    const skip = informationStep.skip as SkipFn;

    it(`should not skip the step for the supported agreement 16 with criteria`, () => {
      expect(
        skip({
          ccn: {
            route: "agreement",
            selected: generateAgreement(16),
          },
        })
      ).toBeFalsy();
    });

    it(`should skip the step for not supported agreement 9999`, () => {
      expect(
        skip({
          ccn: {
            route: "agreement",
            selected: generateAgreement(9999),
          },
        })
      ).toBeTruthy();
    });

    it(`should skip the step for legal`, () => {
      expect(
        skip({
          ccn: {
            route: "not-selected",
          },
        })
      ).toBeTruthy();
    });
  });
});
