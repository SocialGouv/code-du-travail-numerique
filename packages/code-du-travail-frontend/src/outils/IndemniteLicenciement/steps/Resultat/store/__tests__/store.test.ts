import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("Result store", () => {
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
    expect(store.getState().resultData.input.legalFormula).toBe(undefined);
    expect(store.getState().resultData.input.legalReferences).toBe(null);
    expect(store.getState().resultData.input.legalSeniority).toBe(null);
  });

  it("should compute the publicodes result with same salary 🔥", () => {
    // Seniority
    store.getState().ancienneteFunction.onChangeDateEntree("01/01/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("01/01/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("01/01/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: MOTIFS[0].label,
      },
    ]);
    store.getState().ancienneteFunction.onValidateStepAnciennete();

    // Salaire ref
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 2000,
        prime: 200,
      },
      {
        month: "février",
        value: 2000,
        prime: 200,
      },
      {
        month: "mars",
        value: 2000,
      },
      {
        month: "avril",
        value: 2000,
      },
      {
        month: "mai",
        value: 2000,
      },
      {
        month: "juin",
        value: 2000,
      },
      {
        month: "juillet",
        value: 2000,
      },
      {
        month: "août",
        value: 2000,
      },
      {
        month: "septembre",
        value: 2000,
      },
      {
        month: "octobre",
        value: 2000,
      },
      {
        month: "novembre",
        value: 2000,
      },
      {
        month: "décembre",
        value: 2000,
      },
    ]);
    store.getState().salairesFunction.onValidateStepSalaires();

    // Contrat de travail
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");

    store.getState().resultFunction.getPublicodesResult();
    expect(store.getState().resultData.input.publicodesResult).toBeTruthy();

    expect(store.getState().salairesData.input.refSalary).toBe(2000);
    expect(store.getState().resultData.input.infoCalcul).toStrictEqual({
      formula: "1 / 4 * Sref * A",
      labels: {
        "Ancienneté totale (A)": 1.83,
        "Licenciement pour inaptitude": "non",
        "Salaire de référence (Sref)": 2000,
      },
    });
  });

  it("should compute the publicodes result with different salaries 💫", () => {
    // Seniority
    store.getState().ancienneteFunction.onChangeDateEntree("01/01/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("01/01/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("01/01/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: MOTIFS[0].label,
      },
    ]);
    store.getState().ancienneteFunction.onValidateStepAnciennete();

    // Salaire ref
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onSalariesChange([
      {
        month: "janvier",
        value: 1000,
        prime: 200,
      },
      {
        month: "décembre",
        value: 1000,
        prime: 200,
      },
      {
        month: "novembre",
        value: 0,
      },
      {
        month: "octobre",
        value: 1000,
      },
      {
        month: "septembre",
        value: 1000,
      },
      {
        month: "août",
        value: 1000,
      },
      {
        month: "juillet",
        value: 1000,
      },
      {
        month: "juin",
        value: 1000,
      },
      {
        month: "mai",
        value: 1000,
      },
      {
        month: "avril",
        value: 1000,
      },
      {
        month: "mars",
        value: 1000,
      },
      {
        month: "février",
        value: 1000,
      },
    ]);
    store.getState().salairesFunction.onValidateStepSalaires();

    // Contrat de travail
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("oui");

    expect(store.getState().salairesData.input.refSalary).toBe(
      916.6666666666666
    );

    store.getState().resultFunction.getPublicodesResult();
    expect(store.getState().resultData.input.publicodesResult).toBeTruthy();

    expect(store.getState().resultData.input.infoCalcul).toStrictEqual({
      formula: "1 / 4 * Sref * A * 2",
      labels: {
        "Ancienneté totale (A)": 1.83,
        "Licenciement pour inaptitude": "oui",
        "Salaire de référence (Sref)": 916.66,
      },
    });
  });
});
