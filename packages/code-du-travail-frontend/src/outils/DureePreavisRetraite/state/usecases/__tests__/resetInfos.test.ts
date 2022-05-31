import { generateStore, publicodesStub } from "../../__tests__/dummies";
import { resetInfos } from "../index";
import { UpdateFormValues } from "../../utils";
import { initialState } from "../../preavisRetraiteStore";
import { PreavisRetraiteState } from "../../types";
import { Agreement } from "../../../../../conventions/Search/api/type";

describe("resetInfos", () => {
  const state: PreavisRetraiteState = {
    ...initialState,
    formValues: {
      infos: {
        question1: "responseA",
        question2: "responseB",
      },
    },
  };
  const store = generateStore(publicodesStub(), state);
  const selectedAgreement: Agreement = {
    id: "KALICONT000044594539",
    url: "hello.com",
    num: 3239,
    shortTitle: "Particuliers employeurs et emploi à domicile",
    slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
    title: "Particuliers employeurs et emploi à domicile",
  };

  describe("Aucune CC n'a été sélectionnée", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const newAgreement = null;
    const oldAgreement = null;

    const newState = resetInfos(
      newAgreement,
      oldAgreement,
      store,
      mockRemoveQuestionFromForm
    );

    it("ne doit pas reset les infos du formulaire", () => {
      expect(newState.formValues.infos).toStrictEqual(state.formValues.infos);
    });

    it("ne doit pas retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(0);
    });
  });

  describe("On sélectionne une CC", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const newAgreement = selectedAgreement;
    const oldAgreement = null;

    const newState = resetInfos(
      newAgreement,
      oldAgreement,
      store,
      mockRemoveQuestionFromForm
    );

    it("doit reset les infos du formulaire", () => {
      expect(newState.formValues.infos).toStrictEqual({});
    });

    it("doit retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        { name: "infos" },
      ]);
    });
  });

  describe("On sélectionne une nouvelle CC", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const newAgreement = selectedAgreement;
    const oldAgreement = { ...selectedAgreement, id: "autreID" };

    const newState = resetInfos(
      newAgreement,
      oldAgreement,
      store,
      mockRemoveQuestionFromForm
    );

    it("doit reset les infos du formulaire", () => {
      expect(newState.formValues.infos).toStrictEqual({});
    });

    it("doit retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        { name: "infos" },
      ]);
    });
  });

  describe("On désélectionne la CC", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const newAgreement = null;
    const oldAgreement = selectedAgreement;

    const newState = resetInfos(
      newAgreement,
      oldAgreement,
      store,
      mockRemoveQuestionFromForm
    );

    it("doit reset les infos du formulaire", () => {
      expect(newState.formValues.infos).toStrictEqual({});
    });

    it("doit retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(1);
      expect(mockRemoveQuestionFromForm.mock.calls[0][0]).toEqual([
        { name: "infos" },
      ]);
    });
  });

  describe("On sélectionne la même CC (cas particulier lié au comportement du composant de recherche de CC)", () => {
    const updateFormValues: UpdateFormValues = () => {};
    const mockRemoveQuestionFromForm = jest.fn(updateFormValues);
    const newAgreement = selectedAgreement;
    const oldAgreement = selectedAgreement;

    const newState = resetInfos(
      newAgreement,
      oldAgreement,
      store,
      mockRemoveQuestionFromForm
    );

    it("ne doit pas reset les infos du formulaire", () => {
      expect(newState.formValues.infos).toStrictEqual(state.formValues.infos);
    });

    it("ne doit pas retirer les anciennes réponses du form", () => {
      expect(mockRemoveQuestionFromForm.mock.calls).toHaveLength(0);
    });
  });
});
