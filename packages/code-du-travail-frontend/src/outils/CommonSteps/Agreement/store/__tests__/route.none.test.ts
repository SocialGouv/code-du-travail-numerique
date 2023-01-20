import { Route } from "../types";
import { createIndemniteLicenciementStore } from "../../../../IndemniteLicenciement/store";
import { loadPublicodesRules } from "../../../..";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

describe("[Store] Un utilisateur choisit de ne pas renseigner sa convention collective", () => {
  let store: ReturnType<typeof createIndemniteLicenciementStore>;

  beforeEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
  });

  it("doit pouvoir passer à l'étape suivante 🚀", () => {
    store.getState().agreementFunction.onRouteChange(Route.none);
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(store.getState().agreementData.error.route).toBe(undefined);
  });
});
