import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("CC 16 store", () => {
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
    expect(store.getState().agreement16Data.input.hasVariablePay).toBe(
      undefined
    );
  });

  it("should change data input", () => {
    store.getState().agreement16Function.onChangeHasVariablePay("non");
    expect(store.getState().agreement16Data.input.hasVariablePay).toBe("non");
  });
});
