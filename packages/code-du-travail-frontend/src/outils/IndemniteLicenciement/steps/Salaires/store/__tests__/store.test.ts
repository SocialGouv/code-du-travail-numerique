import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("Store", () => {
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
    expect(store.getState().salairesData.input.hasPrimes).toBe(undefined);
    expect(store.getState().salairesData.input.hasSameSalaire).toBe(undefined);
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe(undefined);
    expect(store.getState().salairesData.input.primes).toStrictEqual([]);
    expect(store.getState().salairesData.input.salaireBrut).toBe(undefined);
    expect(store.getState().salairesData.input.salaryPeriods).toStrictEqual([]);
  });

  it("should init errors", () => {
    expect(store.getState().salairesData.error.errorHasPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalaire).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaireBrut).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(
      undefined
    );
  });

  it("should update properties (with primes and different salaries)", () => {
    store.getState().salairesFunction.onChangeHasPrimes("oui");
    store.getState().salairesFunction.onChangeHasSameSalaire("non");
    store.getState().salairesFunction.onChangeHasTempsPartiel("oui");
    store.getState().salairesFunction.onChangePrimes([2000, 3000]);
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 2000,
      },
    ]);
    expect(store.getState().salairesData.input.hasSameSalaire).toBe("non");
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe("oui");
    expect(store.getState().salairesData.input.primes).toStrictEqual([
      2000, 3000,
    ]);
    expect(store.getState().salairesData.input.salaryPeriods).toStrictEqual([
      {
        month: "janvier",
        value: 2000,
      },
    ]);
  });

  it("should update properties (without primes and same salary)", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("oui");
    store.getState().salairesFunction.onChangeSalaireBrut("2000");
    store.getState().salairesFunction.onChangeHasPrimes("non");
    expect(store.getState().salairesData.input.hasSameSalaire).toBe("oui");
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe("non");
    expect(store.getState().salairesData.input.hasPrimes).toBe("non");
    expect(store.getState().salairesData.input.salaireBrut).toBe("2000");
  });

  it("should render an error if no fields are completed", () => {
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error if partial time has been completed", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorHasSameSalaire).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error if partial time has been set to yes", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("oui");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(true);
  });

  it("should render an error if brut salary is not completed", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("oui");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorSalaireBrut).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error if salaries are not completed if it is not the same salary", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("non");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      "Vous devez compléter l'ensemble des champs"
    );
    expect(store.getState().salairesData.error.errorHasPrimes).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error for primes", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("non");
    store.getState().salairesFunction.onChangeHasPrimes("oui");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(false);
    expect(store.getState().salairesData.error.errorPrimes).toBe(
      "Vous devez compléter l'ensemble des champs"
    );
  });

  it("should validate the step (with different salaries) 🚀", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("non");
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 2000,
      },
    ]);
    store.getState().salairesFunction.onChangeHasPrimes("oui");
    store.getState().salairesFunction.onChangePrimes([2000, 3000]);
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(true);
    expect(store.getState().salairesData.error.errorHasPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalaire).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaireBrut).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(false);
  });

  it("should validate the step (with same salary) 🚀", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalaire("oui");
    store.getState().salairesFunction.onChangeSalaireBrut("2000");
    store.getState().salairesFunction.onChangeHasPrimes("non");
    const isValid = store.getState().salairesFunction.onValidateStepSalaires();
    expect(isValid).toBe(true);
    expect(store.getState().salairesData.error.errorHasPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalaire).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaireBrut).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(false);
  });
});
