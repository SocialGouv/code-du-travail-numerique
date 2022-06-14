import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import createAncienneteStore from "../store";

describe(("Store"), () => {
  let store;

  beforeAll(() => {})
  it(("should be defined"), () => {
    const store = createIndemniteLicenciementStore(loadPublicodesRules("indeminite-licenciement"));
    store.getState().ancienneteData
    expect(store).toBeDefined();
  }

})
