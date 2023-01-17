import { getSourceUrlFromPath, removeQueryParameters, toUrl } from "..";

describe("toUrl", () => {
  test.each`
    input                       | expected
    ${"io.md"}                  | ${"azure.url/cdtn/io.md"}
    ${"complete.url/dev/io.md"} | ${"azure.url/cdtn/io.md"}
    ${""}                       | ${""}
  `("should return $expected for $input", ({ input, expected }) => {
    expect(toUrl(input)).toBe(expected);
  });
});

describe("removeQueryParameters", () => {
  test.each`
    input                                                                                          | expected
    ${"/contribution/44-les-conges-pour-evenements-familiaux"}                                     | ${"/contribution/44-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux?q=m&m=p"} | ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux??"}       | ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux?ds=ds?"}  | ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"}
  `(
    "should transform $input to this canonical url: $input",
    ({ input, expected }) => {
      expect(removeQueryParameters(input)).toBe(expected);
    }
  );
});

describe("getSourceUrlFromPath", () => {
  it.each`
    path                                                                                                                  | referrerUrl
    ${"https://code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://www.service-public.fr"}                 | ${"https://www.service-public.fr"}
    ${"code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://www.service-public.fr"}                         | ${"https://www.service-public.fr"}
    ${"code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://service-public.fr/particuliers/vosdroits/F987"} | ${"https://service-public.fr/particuliers/vosdroits/F987"}
    ${""}                                                                                                                 | ${null}
    ${"blabla"}                                                                                                           | ${null}
    ${undefined}                                                                                                          | ${null}
  `("should give $referrerUrl from $path", ({ path, referrerUrl }) => {
    const result = getSourceUrlFromPath(path);
    expect(result).toBe(referrerUrl);
  });
});
