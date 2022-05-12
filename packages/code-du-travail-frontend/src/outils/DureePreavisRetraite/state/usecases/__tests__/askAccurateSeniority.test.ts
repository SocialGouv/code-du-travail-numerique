import { generateStore, publicodesStub } from "../../__tests__/dummies";
import { initialState } from "../../preavisRetraiteStore";
import { askAccurateSeniority } from "../index";
import { UpdateFormValues } from "../../utils";
import { SeniorityValue } from "../../../form";

describe("askAccurateSeniority", () => {
  describe("l'utilisateur possède moins de 2 ans d'ancienneté", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockUpdateFormValues = jest.fn(updateFormValues);
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        seniority: {
          moreThanXYear: false,
        },
      },
    });
    const newState = askAccurateSeniority(store, mockUpdateFormValues);

    it("doit demander le nombre de mois exacte", () => {
      expect(newState.steps.seniority.showAccurateSeniority).toBeTruthy();
    });

    it("doit remettre à undefined la valeur de l'ancienneté", () => {
      expect(mockUpdateFormValues.mock.calls).toHaveLength(1);
      expect(mockUpdateFormValues.mock.calls[0][0]).toEqual([
        { name: SeniorityValue },
      ]);
    });
  });

  describe("l'utilisateur possède plus de 2 ans d'ancienneté ", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockUpdateFormValues = jest.fn(updateFormValues);
    const store = generateStore(publicodesStub(), {
      ...initialState,
      formValues: {
        seniority: {
          moreThanXYear: true,
        },
      },
    });
    const newState = askAccurateSeniority(store, mockUpdateFormValues);

    it("ne doit pas demander le nombre de mois exacte", () => {
      expect(newState.steps.seniority.showAccurateSeniority).toBeFalsy();
    });

    it("doit mettre la valeur de l'ancienneté à 25", () => {
      expect(mockUpdateFormValues.mock.calls).toHaveLength(1);
      expect(mockUpdateFormValues.mock.calls[0][0]).toEqual([
        { name: SeniorityValue, value: "25" },
      ]);
    });
  });

  describe("l'utilisateur possède plus de 5 ans d'ancienneté ", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockUpdateFormValues = jest.fn(updateFormValues);
    const store = generateStore(publicodesStub(), {
      ...initialState,
      steps: {
        ...initialState.steps,
        seniority: {
          minYearCount: 5,
          showAccurateSeniority: false,
        },
      },
      formValues: {
        seniority: {
          moreThanXYear: true,
        },
      },
    });
    const newState = askAccurateSeniority(store, mockUpdateFormValues);

    it("ne doit pas demander le nombre de mois exacte", () => {
      expect(newState.steps.seniority.showAccurateSeniority).toBeFalsy();
    });

    it("doit mettre la valeur de l'ancienneté à 61", () => {
      expect(mockUpdateFormValues.mock.calls).toHaveLength(1);
      expect(mockUpdateFormValues.mock.calls[0][0]).toEqual([
        { name: SeniorityValue, value: "61" },
      ]);
    });
  });
});
