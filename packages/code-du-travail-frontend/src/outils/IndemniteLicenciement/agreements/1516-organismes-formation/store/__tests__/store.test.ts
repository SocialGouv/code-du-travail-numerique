import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("CC 1516 store", () => {
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
    expect(store.getState().agreement1516Data.input.hasReceivedSalaries).toBe(
      undefined
    );
    expect(store.getState().agreement1516Data.input.salaryPeriods).toEqual([]);
  });

  it("should change data input", () => {
    store.getState().agreement1516Function.onChangeHasReceivedSalaries("non");
    expect(store.getState().agreement1516Data.input.hasReceivedSalaries).toBe(
      "non"
    );
    store.getState().agreement1516Function.onSalariesChange([
      {
        month: "janvier",
        prime: 1000,
        value: 2000,
      },
    ]);
    expect(store.getState().agreement1516Data.input.salaryPeriods).toEqual([
      {
        month: "janvier",
        prime: 1000,
        value: 2000,
      },
    ]);
  });
});
