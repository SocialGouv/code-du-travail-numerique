import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { MotifKeys } from "@socialgouv/modeles-social";

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
    expect(store.getState().resultData.input.legalFormula).toEqual({
      explanations: [],
      formula: "",
    });
    expect(store.getState().resultData.input.legalReferences).toEqual([]);
    expect(store.getState().resultData.input.legalSeniority).toBe(0);
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
        motif: {
          label: "Label",
          key: MotifKeys.maladieNonPro,
          value: 1,
        },
      },
    ]);
    store.getState().ancienneteFunction.onValidateStepAnciennete();

    // Salaire ref
    store.getState().salairesFunction.onChangeHasTempsPartiel("non");
    store.getState().salairesFunction.onChangeHasSameSalary("non");
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
    expect(
      store.getState().resultData.input.publicodesLegalResult
    ).toBeTruthy();

    expect(store.getState().salairesData.input.refSalary).toBe(2000);
  });
});
