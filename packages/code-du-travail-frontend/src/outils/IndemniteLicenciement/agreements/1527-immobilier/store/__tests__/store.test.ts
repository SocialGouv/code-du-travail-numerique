import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("CC 1527 store", () => {
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
    expect(store.getState().agreement1527Data.input.hasContractSalary).toBe(
      undefined
    );
    expect(store.getState().agreement1527Data.input.contractSalary).toEqual(
      undefined
    );
  });

  it("should change data input", () => {
    store.getState().agreement1527Function.onChangeHasContractSalary("non");
    expect(store.getState().agreement1527Data.input.hasContractSalary).toBe(
      "non"
    );
    store.getState().agreement1527Function.onChangeContractSalary("1000");
    expect(store.getState().agreement1527Data.input.contractSalary).toEqual(
      "1000"
    );
  });
});
