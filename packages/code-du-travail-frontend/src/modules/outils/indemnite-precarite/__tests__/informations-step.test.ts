import { createIndemnitePrecariteStore } from "../steps/store";

describe("Indemnité de précarité - Étape Informations", () => {
  let store: ReturnType<typeof createIndemnitePrecariteStore>;

  beforeEach(() => {
    store = createIndemnitePrecariteStore();
  });

  describe("Fonctions de base", () => {
    it("devrait avoir les fonctions nécessaires dans le store", () => {
      const state = store.getState();

      // Vérifier que les fonctions existent
      expect(
        typeof state.informationsFunction.generatePublicodesQuestions
      ).toBe("function");
      expect(typeof state.informationsFunction.onInformationsChange).toBe(
        "function"
      );
      expect(typeof state.informationsFunction.checkIneligibility).toBe(
        "function"
      );
      expect(typeof state.informationsFunction.shouldSkipStep).toBe("function");
      expect(typeof state.informationsFunction.resetQuestions).toBe("function");
      expect(typeof state.informationsFunction.onNextStep).toBe("function");
      expect(typeof state.informationsFunction.onContractTypeChange).toBe(
        "function"
      );
      expect(typeof state.informationsFunction.onCriteriaChange).toBe(
        "function"
      );
    });

    it("devrait avoir l'état initial correct", () => {
      const state = store.getState().informationsData.input;

      expect(state.publicodesInformations).toEqual([]);
      expect(state.hasNoMissingQuestions).toBe(true);
      expect(state.informationError).toBe(false);
      expect(state.contractType).toBeUndefined();
      expect(state.criteria).toEqual({});
    });
  });

  describe("Vérification d'ineligibility", () => {
    it("devrait retourner false pour l'ineligibility quand aucune convention collective n'est sélectionnée", () => {
      const isIneligible = store
        .getState()
        .informationsFunction.checkIneligibility();
      expect(isIneligible).toBe(false);
    });
  });

  describe("Gestion des questions", () => {
    it("devrait pouvoir réinitialiser les questions", () => {
      // Réinitialiser les questions
      store.getState().informationsFunction.resetQuestions();

      const state = store.getState().informationsData.input;
      expect(state.publicodesInformations).toHaveLength(0);
      expect(state.hasNoMissingQuestions).toBe(true);
      expect(state.informationError).toBe(false);
    });

    it("devrait pouvoir générer des questions sans convention collective", () => {
      const success = store
        .getState()
        .informationsFunction.generatePublicodesQuestions();
      expect(success).toBe(false); // Devrait retourner false sans publicodes
    });
  });

  describe("Gestion des critères", () => {
    it("devrait pouvoir changer les critères", () => {
      const newCriteria = { test: "value" };
      store.getState().informationsFunction.onCriteriaChange(newCriteria);

      const state = store.getState().informationsData.input;
      expect(state.criteria).toEqual(newCriteria);
    });
  });

  describe("Validation", () => {
    it("devrait pouvoir valider l'étape", () => {
      const validationResult = store
        .getState()
        .informationsFunction.onNextStep();
      expect(["valid", "not-valid"]).toContain(validationResult);
    });

    it("devrait pouvoir vérifier si l'étape doit être ignorée", () => {
      const shouldSkip = store.getState().informationsFunction.shouldSkipStep();
      expect(typeof shouldSkip).toBe("boolean");
    });
  });
});
