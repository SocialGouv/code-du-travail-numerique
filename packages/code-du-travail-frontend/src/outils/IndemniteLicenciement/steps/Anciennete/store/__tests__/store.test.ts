import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { MotifKeys } from "@socialgouv/modeles-social";
import { ValidationResponse } from "../../../../../Components/SimulatorLayout";

describe("Ancienneté store", () => {
  let store = createIndemniteLicenciementStore(
    loadPublicodesRules("indemnite-licenciement")
  );

  // to reset store after each unit test
  afterEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
  });

  it("should be defined and init", () => {
    expect(store).toBeDefined();
  });

  it("should init data input", () => {
    expect(store.getState().ancienneteData.input.absencePeriods).toStrictEqual(
      []
    );
    expect(store.getState().ancienneteData.input.dateEntree).toBe(undefined);
    expect(store.getState().ancienneteData.input.dateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.input.dateSortie).toBe(undefined);
    expect(store.getState().ancienneteData.input.hasAbsenceProlonge).toBe(
      undefined
    );
  });

  it("should init errors", () => {
    expect(store.getState().ancienneteData.error.errorAbsencePeriods).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorAbsenceProlonge).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateSortie).toBe(
      undefined
    );
  });

  it("should update properties", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("20/02/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("20/02/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("20/02/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: {
          label: "Label",
          key: MotifKeys.maladieNonPro,
          value: 1,
        },
      },
    ]);
    expect(store.getState().ancienneteData.input.absencePeriods).toStrictEqual([
      {
        durationInMonth: 2,
        motif: {
          label: "Label",
          key: MotifKeys.maladieNonPro,
          value: 1,
        },
        startedAt: undefined,
      },
    ]);
    expect(store.getState().ancienneteData.input.dateEntree).toBe("20/02/2020");
    expect(store.getState().ancienneteData.input.dateNotification).toBe(
      "20/02/2021"
    );
    expect(store.getState().ancienneteData.input.dateSortie).toBe("20/02/2022");
    expect(store.getState().ancienneteData.input.hasAbsenceProlonge).toBe(
      "oui"
    );
  });

  it("should render an error for a date", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/1821");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      "La date d'entrée est invalide"
    );
  });

  it("should render an error for date d'entrée > date de sortie", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/2022");
    store.getState().ancienneteFunction.onChangeDateSortie("05/05/2021");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    const hasMessageError = store
      .getState()
      .ancienneteData.error.errorDateSortie!.includes(
        "La date de sortie doit se situer après le <strong>"
      );
    expect(hasMessageError).toBe(true);
  });

  it("should render an error for date de notification > 18 last months", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2018");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer dans les 18 derniers mois"
    );
  });

  it("should render an error for date de notification < date de sortie", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("05/05/2020");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer avant la date de sortie"
    );
  });

  it("should render an error for date de notification > date d'entrée", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2020");
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/2021");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer après la date d’entrée"
    );
  });

  it("should render an error for uncompleted absences", () => {
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(
      store.getState().ancienneteData.error.errorAbsencePeriods?.global
    ).toBe("Vous devez renseigner tous les champs");
  });

  it("should validate the step 🚀", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("20/02/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("20/02/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("20/02/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: {
          label: "Label",
          key: MotifKeys.maladieNonPro,
          value: 1,
        },
      },
    ]);
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateWithEligibility();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(store.getState().ancienneteData.error.errorAbsencePeriods).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorAbsenceProlonge).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateSortie).toBe(
      undefined
    );
  });
});
