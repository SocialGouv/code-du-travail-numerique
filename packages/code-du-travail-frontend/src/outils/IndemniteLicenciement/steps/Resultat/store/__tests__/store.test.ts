import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { MOTIFS } from "../../../Anciennete/components/AbsencePeriods";

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
    expect(store.getState().resultData.input.infoCalcul).toBe(undefined);
    expect(store.getState().resultData.input.publicodesResult).toBe(null);
    expect(store.getState().resultData.input.salaireRef).toBe(0);
    expect(store.getState().resultData.input.seniority).toBe(0);
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

    // Salaire ref
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

    // Contrat de travail
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("non");

    store.getState().resultFunction.getPublicodesResult();
    expect(store.getState().resultData.input.publicodesResult).toStrictEqual({
      unit: {
        denominators: [],
        numerators: ["€"],
      },
      value: 916.667,
    });
    expect(store.getState().resultData.input.salaireRef).toBe(2000);
    expect(store.getState().resultData.input.seniority).toBe(
      1.8333333333333333
    );
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

    // Salaire ref
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

    // Contrat de travail
    store
      .getState()
      .contratTravailFunction.onChangeLicenciementInaptitude("oui");

    store.getState().resultFunction.getPublicodesResult();
    expect(store.getState().resultData.input.publicodesResult).toStrictEqual({
      unit: {
        denominators: [],
        numerators: ["€"],
      },
      value: 840.278,
    });
    expect(store.getState().resultData.input.salaireRef).toBe(
      916.6666666666666
    );
    expect(store.getState().resultData.input.seniority).toBe(
      1.8333333333333333
    );
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
