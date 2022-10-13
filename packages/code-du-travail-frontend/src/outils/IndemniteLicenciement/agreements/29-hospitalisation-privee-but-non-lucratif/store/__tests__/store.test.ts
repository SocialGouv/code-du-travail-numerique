import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";

describe("CC 29 store", () => {
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
    expect(store.getState().agreement29Data.input.hasSixBestSalaries).toBe(
      undefined
    );
    expect(store.getState().agreement29Data.input.sixBestSalariesTotal).toEqual(
      undefined
    );
  });

  it("should change data input", () => {
    store.getState().agreement29Function.onChangeHasSixBestSalaries("non");
    expect(store.getState().agreement29Data.input.hasSixBestSalaries).toBe(
      "non"
    );
    store.getState().agreement29Function.onChangeSixBestSalariesTotal("1000");
    expect(store.getState().agreement29Data.input.sixBestSalariesTotal).toEqual(
      "1000"
    );
  });
});
