import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

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
  });

  it("should update properties", () => {
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementFauteGrave("non");
    store.getState().contratTravailFunction.onChangeTypeContratTravail("cdi");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");
    expect(
      store.getState().contratTravailData.input.licenciementFauteGrave
    ).toBe("non");
    expect(store.getState().contratTravailData.input.typeContratTravail).toBe(
      "cdi"
    );
    expect(
      store.getState().contratTravailData.input.licenciementInaptitude
    ).toBe("non");
  });

  it("should render an error for cdd", () => {
    expect(store.getState().contratTravailData.error.errorCdd).toBe(false);
    store.getState().contratTravailFunction.onChangeTypeContratTravail("cdd");
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateStepInfo();
    expect(isValid).toBe(false);
    expect(store.getState().contratTravailData.error.errorCdd).toBe(true);
  });

  it("should render an error for faute grave", () => {
    expect(store.getState().contratTravailData.error.errorFauteGrave).toBe(
      false
    );
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementFauteGrave("oui");
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateStepInfo();
    expect(isValid).toBe(false);
    expect(store.getState().contratTravailData.error.errorFauteGrave).toBe(
      true
    );
  });

  it("should render an error for field uncompleted", () => {
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateStepInfo();
    expect(isValid).toBe(false);
    expect(
      store.getState().contratTravailData.error.errorLicenciementFauteGrave
    ).toBe("Vous devez répondre à cette question");
    expect(
      store.getState().contratTravailData.error.errorLicenciementInaptitude
    ).toBe("Vous devez répondre à cette question");
    expect(
      store.getState().contratTravailData.error.errorTypeContratTravail
    ).toBe("Vous devez répondre à cette question");
  });

  it("should validate the step 🚀", () => {
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementFauteGrave("non");
    store.getState().contratTravailFunction.onChangeTypeContratTravail("cdi");
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");
    const isValid = store
      .getState()
      .contratTravailFunction.onValidateStepInfo();
    expect(isValid).toBe(true);
    expect(
      store.getState().contratTravailData.error.errorLicenciementFauteGrave
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorLicenciementInaptitude
    ).toBe(undefined);
    expect(
      store.getState().contratTravailData.error.errorTypeContratTravail
    ).toBe(undefined);
    expect(store.getState().contratTravailData.error.errorFauteGrave).toBe(
      false
    );
    expect(store.getState().contratTravailData.error.errorCdd).toBe(false);
  });
});
