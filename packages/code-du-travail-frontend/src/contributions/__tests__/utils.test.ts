import { showNewContribPage } from "../utils";

describe(`showNewContribPage`, () => {
  test(`should match`, () => {
    expect(
      showNewContribPage(
        "quelle-est-la-duree-de-preavis-en-cas-de-licenciement"
      )
    ).toEqual(true);

    expect(
      showNewContribPage("123-les-conges-pour-evenements-familiaux")
    ).toEqual(true);

    expect(
      showNewContribPage(
        "123-quelle-est-la-duree-de-preavis-en-cas-de-licenciement"
      )
    ).toEqual(true);
  });

  test(`should not match`, () => {
    expect(
      showNewContribPage("quelle-est-la-duree-de-preavis-en-cas-de-")
    ).toEqual(false);
    expect(showNewContribPage("tata")).toEqual(false);
  });
});
