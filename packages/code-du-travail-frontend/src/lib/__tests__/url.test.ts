import { removeQueryParameters, toUrl, urlRulesReplacement } from "..";

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

describe("replaceSlug", () => {
  test.each`
    url                                                                                                        | expected
    ${"/contribution/2111-les-conges-pour-evenements-familiaux"}                                               | ${"/contribution/3239-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/contribution/2111-les-conges-pour-evenements-familiaux?q=m&m=p"}           | ${"https://code.travail.gouv.fr/contribution/3239-les-conges-pour-evenements-familiaux?q=m&m=p"}
    ${"https://code.travail.gouv.fr/contribution/2395-les-conges-pour-evenements-familiaux"}                   | ${"https://code.travail.gouv.fr/contribution/3239-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"}                     | ${"https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"}
    ${"https://code.travail.gouv.fr/convention-collective/2111-salaries-du-particulier-employeur"}             | ${"https://code.travail.gouv.fr/convention-collective/3239-secteur-des-particuliers-employeurs-et-de-lemploi-a-domicile"}
    ${"https://code.travail.gouv.fr/convention-collective/2111-salaries-du-particulier-employeur?q=test"}      | ${"https://code.travail.gouv.fr/convention-collective/3239-secteur-des-particuliers-employeurs-et-de-lemploi-a-domicile?q=test"}
    ${"/convention-collective/2111-salaries-du-particulier-employeur?q=test"}                                  | ${"/convention-collective/3239-secteur-des-particuliers-employeurs-et-de-lemploi-a-domicile?q=test"}
    ${"https://code.travail.gouv.fr/convention-collective/2395-assistants-maternels-du-particulier-employeur"} | ${"https://code.travail.gouv.fr/convention-collective/3239-secteur-des-particuliers-employeurs-et-de-lemploi-a-domicile"}
    ${"https://code.travail.gouv.fr/contribution/2395-salaries-du-particulier-employeur"}                      | ${"https://code.travail.gouv.fr/contribution/3239-salaries-du-particulier-employeur"}
  `(
    "should transform $url to this canonical url: $expected",
    ({ url, expected }) => {
      expect(urlRulesReplacement(url)).toBe(expected);
    }
  );
});
