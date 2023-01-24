import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { ValidationResponse } from "../../../../../Components/SimulatorLayout";

describe("Store", () => {
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
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe(undefined);
    expect(store.getState().salairesData.input.hasSameSalary).toBe(undefined);
    expect(store.getState().salairesData.input.salary).toBe(undefined);
    expect(store.getState().salairesData.input.salaryPeriods).toStrictEqual([]);
  });

  it("should init errors", () => {
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorSalary).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalary).toBe(
      undefined
    );
  });

  it("should update properties (with primes and different salaries)", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("oui");
    store.getState().salairesFunction.onChangeHasSameSalary("non");
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 2000,
        prime: 2000,
      },
    ]);
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe("oui");
    expect(store.getState().salairesData.input.hasSameSalary).toBe("non");
    expect(store.getState().salairesData.input.salaryPeriods).toStrictEqual([
      {
        month: "janvier",
        value: 2000,
        prime: 2000,
      },
    ]);
  });

  it("should update properties (without primes and same salary)", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    expect(store.getState().salairesData.input.hasTempsPartiel).toBe("non");
  });

  it("should render an error if no fields are completed", () => {
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error if partial time has been completed", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
  });

  it("should render an error if partial time has been set to yes", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("oui");
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(true);
  });

  it("should render an error if brut salary is not completed", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalary("oui");
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().salairesData.error.errorSalary).toBe(
      "Vous devez répondre à cette question"
    );
  });

  it("should render an error if salaries are not completed if it is not the same salary", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalary("non");
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.NotValid);
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      "Vous devez compléter l'ensemble des champs"
    );
  });

  it("should validate the step with same salary 🚀", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalary("oui");
    store.getState().salairesFunction.onChangeSalary("2000");
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(false);
    expect(store.getState().salairesData.error.errorSalary).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalary).toBe(
      undefined
    );
  });

  it("should validate the step 🚀", () => {
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalary("non");
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 2000,
      },
    ]);
    const isValid = store.getState().salairesFunction.onValidateStep();
    expect(isValid).toBe(ValidationResponse.Valid);
    expect(store.getState().salairesData.error.errorHasTempsPartiel).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorPrimes).toBe(undefined);
    expect(store.getState().salairesData.error.errorSalaryPeriods).toBe(
      undefined
    );
    expect(store.getState().salairesData.error.errorTempsPartiel).toBe(false);
    expect(store.getState().salairesData.error.errorSalary).toBe(undefined);
    expect(store.getState().salairesData.error.errorHasSameSalary).toBe(
      undefined
    );
  });
});
