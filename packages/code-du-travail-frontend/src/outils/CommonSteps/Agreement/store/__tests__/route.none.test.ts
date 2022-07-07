import { Route } from "../types";
import { createIndemniteLicenciementStore } from "../../../../IndemniteLicenciement/store";

describe("[Store] Un utilisateur choisit de ne pas renseigner sa convention collective", () => {
  let store: ReturnType<typeof createIndemniteLicenciementStore>;

  beforeEach(() => {
    store = createIndemniteLicenciementStore("");
  });

  it("doit pouvoir passer à l'étape suivante 🚀", () => {
    store.getState().agreementFunction.onRouteChange(Route.none);
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(true);
    expect(store.getState().agreementData.error.route).toBe(undefined);
  });
});
