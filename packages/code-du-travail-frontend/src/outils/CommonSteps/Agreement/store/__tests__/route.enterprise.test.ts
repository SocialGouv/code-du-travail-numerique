import { Route } from "../types";
import { createIndemniteLicenciementStore } from "../../../../IndemniteLicenciement/store";

describe("[Store] Un utilisateur souhaite trouver sa convention collective", () => {
  let store: ReturnType<typeof createIndemniteLicenciementStore>;

  beforeEach(() => {
    store = createIndemniteLicenciementStore("indemnite-licenciement");
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
    store.getState().agreementFunction.onRouteChange(Route.enterprise);
    expect(store.getState().agreementData.input.route).toBe(Route.enterprise);
  });

  it("should render an error for field uncompleted", () => {
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(false);
    expect(store.getState().agreementData.error.route).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should validate the step 🚀", () => {
    store.getState().agreementFunction.onRouteChange(Route.enterprise);
    store.getState().agreementFunction.onAgreementChange(
      {
        id: "AAA",
        num: 1234,
        shortTitle: "",
        slug: "",
        title: "",
      },
      {
        etablissements: 1,
        conventions: [],
        label: "",
        highlightLabel: "",
        simpleLabel: "",
        matching: 1,
        siren: "",
      }
    );
    const isValid = store.getState().agreementFunction.onValidateStep();
    expect(isValid).toBe(true);
    expect(store.getState().agreementData.error.route).toBe(undefined);
  });
});
