import { publicodesStub, generateStore } from "../../__tests__/dummies";
import { initialState } from "../../preavisRetraiteStore";
import computeMinSeniorityYear from "../computeMinSeniorityYear";

describe("computeMinSeniorityYear", () => {
  describe("l'utilisateur sélectionne la CC 2264 en mise à la retraite", () => {
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        origin: {
          isRetirementMandatory: "oui",
        },
        ccn: {
          route: "agreement",
          selected: {
            id: "",
            num: 2264,
            title: "",
            shortTitle: "",
            slug: "",
          },
        },
      },
    });
    const newState = computeMinSeniorityYear(store);

    it("doit demander au minimum 5 ans d'ancienneté", () => {
      expect(newState.steps.seniority.minYearCount).toBe(5);
    });
  });

  describe("l'utilisateur sélectionne la CC 2264 en départ à la retraite", () => {
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        origin: {
          isRetirementMandatory: "non",
        },
        ccn: {
          route: "agreement",
          selected: {
            id: "",
            num: 2264,
            title: "",
            shortTitle: "",
            slug: "",
          },
        },
      },
    });
    const newState = computeMinSeniorityYear(store);

    it("doit demander au minimum 2 ans d'ancienneté", () => {
      expect(newState.steps.seniority.minYearCount).toBe(2);
    });
  });

  describe("l'utilisateur sélectionne une autre CC", () => {
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        origin: {
          isRetirementMandatory: "oui",
        },
        ccn: {
          route: "agreement",
          selected: {
            id: "",
            num: 1090,
            title: "",
            shortTitle: "",
            slug: "",
          },
        },
      },
    });
    const newState = computeMinSeniorityYear(store);

    it("doit demander au minimum 2 ans d'ancienneté", () => {
      expect(newState.steps.seniority.minYearCount).toBe(2);
    });
  });

  describe("l'utilisateur ne sélectionne pas de CC", () => {
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        origin: {
          isRetirementMandatory: "oui",
        },
        ccn: {
          route: "not-selected",
        },
      },
    });
    const newState = computeMinSeniorityYear(store);

    it("doit demander au minimum 2 ans d'ancienneté", () => {
      expect(newState.steps.seniority.minYearCount).toBe(2);
    });
  });
});
