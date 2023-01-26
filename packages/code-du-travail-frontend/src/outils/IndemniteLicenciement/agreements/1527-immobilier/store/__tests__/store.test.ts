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
    expect(store.getState().agreement1527Data.input.hasCommission).toBe(
      undefined
    );
  });

  it("should change data input", () => {
    store.getState().agreement1527Function.onChangeHasCommission("non");
    expect(store.getState().agreement1527Data.input.hasCommission).toBe("non");
  });
});
