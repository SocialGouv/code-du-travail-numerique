import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { ValidationResponse } from "../../../../../Components/SimulatorLayout";

describe("Contrat de travail store", () => {
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
    expect(
      store.getState().contratTravailData.input.licenciementFauteGrave
    ).toBe(undefined);
    expect(store.getState().contratTravailData.input.typeContratTravail).toBe(
      undefined
    );
    expect(
      store.getState().contratTravailData.input.licenciementInaptitude
    ).toBe(undefined);
    expect(store.getState().contratTravailData.input.arretTravail).toBe(
      undefined
    );
    expect(store.getState().contratTravailData.input.dateArretTravail).toBe(
      undefined
    );
  });

  it("should init errors", () => {
    expect(
      store.getState().contratTravailData.error.errorLicenciementFauteGrave
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorLicenciementInaptitude
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorTypeContratTravail
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorDateArretTravail
    ).toBe(undefined);
    expect(store.getState().contratTravailData.error.errorArretTravail).toBe(
      undefined
    );
  });

  it("should update properties", () => {
    store.getState().contratTravailFunction.onChangeTypeContratTravail("cdi");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementFauteGrave("non");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");
    expect(store.getState().contratTravailData.input.typeContratTravail).toBe(
      "cdi"
    );
    expect(
      store.getState().contratTravailData.input.licenciementFauteGrave
    ).toBe("non");
    expect(
      store.getState().contratTravailData.input.licenciementInaptitude
    ).toBe("non");
  });

  it("should render an error for field uncompleted", () => {
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(
      store.getState().contratTravailData.error.errorTypeContratTravail
    ).toBe("Vous devez répondre à cette question");
  });

  it("should validate the step 🚀", () => {
    store.getState().contratTravailFunction.onChangeTypeContratTravail("cdi");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementFauteGrave("non");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");
    store.getState().contratTravailFunction.onChangeArretTravail("non");
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(
      store.getState().contratTravailData.error.errorLicenciementFauteGrave
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorLicenciementInaptitude
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorTypeContratTravail
    ).toBe(undefined);
  });
});
