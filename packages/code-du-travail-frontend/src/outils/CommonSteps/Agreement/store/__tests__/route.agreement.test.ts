import { Route } from "../types";
import { createIndemniteLicenciementStore } from "../../../../IndemniteLicenciement/store";
import { loadPublicodesRules } from "../../../../api";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

describe("[Store] Un utilisateur souhaite saisir sa convention collective", () => {
  let store: ReturnType<typeof createIndemniteLicenciementStore>;

  beforeEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
  });

  it("should be defined and init", () => {
    expect(store).toBeDefined();
  });

  it("should init data input", () => {
    expect(store.getState().agreementData.input.route).toBe(undefined);
  });

  it("should init errors", () => {
    expect(store.getState().agreementData.error.route).toBe(undefined);
  });

  it("should update properties", () => {
    store.getState().agreementFunction.onRouteChange(Route.agreement);
    expect(store.getState().agreementData.input.route).toBe(Route.agreement);
  });

  it("should render an error for field uncompleted", () => {
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().agreementData.error.route).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should validate the step 🚀", () => {
    store.getState().agreementFunction.onRouteChange(Route.none);
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(store.getState().agreementData.error.route).toBe(undefined);
  });
});
