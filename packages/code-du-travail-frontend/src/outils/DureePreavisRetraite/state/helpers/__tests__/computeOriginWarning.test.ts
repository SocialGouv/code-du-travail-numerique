import { dummyPublicodes, generateStore } from "../../__tests__/dummies";
import { computeOriginWarning } from "../index";

describe("computeOriginWarning", () => {
  describe("l'utilisateur sélectionne départ à la retraite", () => {
    const store = generateStore(dummyPublicodes);
    const newState = computeOriginWarning(store, "départ");

    it("ne doit pas afficher de warning", () => {
      expect(newState.steps.origin.showWarning).toBeFalsy();
    });
  });

  describe("l'utilisateur sélectionne mise à la retraite", () => {
    const store = generateStore(dummyPublicodes);
    const newState = computeOriginWarning(store, "mise");

    it("doit afficher de warning", () => {
      expect(newState.steps.origin.showWarning).toBeTruthy();
    });
  });
});
