import { heuresRechercheEmploiData as data } from "@socialgouv/modeles-social";

import { generateAgreement } from "../../../../test/generateAgreement";
import { ActionName, SkipFn } from "../../common/type/WizardType";
import { initialState, stepReducer } from "../stepReducer";

describe("initialSteps", () => {
  it("should return default steps", () => {
    expect(initialState.steps.map(({ name }) => ({ name }))).toEqual([
      { name: "intro" },
      { name: "info_cc" },
      { name: "rupture" },
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

  const supportedIdcc = data.situations
    .map((item) => item.idcc)
    .filter((idcc) => idcc !== 0);
  it("should have supported IDCC", () => {
    expect(supportedIdcc.length).toBeGreaterThan(0);
  });

  describe("Skip the rupture steps", () => {
    const ruptureStep = initialState.steps.filter(
      (step) => step.name == "rupture"
    )[0];

    it("should contains a rupture step", () => {
      expect(ruptureStep).toBeDefined();
    });

    it("should define a skip function", () => {
      expect(ruptureStep.skip).toBeDefined();
    });

    const skip = ruptureStep.skip as SkipFn;

    supportedIdcc.forEach((idcc) => {
      it(`should not skip the step for the supported agreement ${idcc}`, () => {
        expect(
          skip({
            ccn: {
              route: "agreement",
              selected: generateAgreement(idcc),
            },
          })
        ).toBeFalsy();
      });
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
          typeRupture: "3| Licenciement",
        })
      ).toBeFalsy();
    });

    it(`should skip the step for the supported agreement 29 without criteria`, () => {
      expect(
        skip({
          ccn: {
            route: "agreement",
            selected: generateAgreement(29),
          },
          typeRupture: "7| Rupture de la période d'essai",
        })
      ).toBeTruthy();
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
