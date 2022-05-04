import { publicodesStub, generateStore } from "../../__tests__/dummies";
import { showOriginWarning } from "../index";

describe("showOriginWarning", () => {
  describe("l'utilisateur sélectionne départ à la retraite", () => {
    const store = generateStore(publicodesStub());
    const newState = showOriginWarning(store, "départ");

    it("ne doit pas afficher de warning", () => {
      expect(newState.steps.origin.showWarning).toBeFalsy();
    });
  });

  describe("l'utilisateur sélectionne mise à la retraite", () => {
    const store = generateStore(publicodesStub());
    const newState = showOriginWarning(store, "mise");

    it("doit afficher de warning", () => {
      expect(newState.steps.origin.showWarning).toBeTruthy();
    });
  });
});
