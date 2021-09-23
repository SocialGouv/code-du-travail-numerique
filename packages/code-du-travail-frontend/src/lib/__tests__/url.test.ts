import { removeQueryParameters, toUrl } from "..";

describe("toUrl", () => {
  test("should return a url for a file", () => {
    expect(toUrl("io.md")).toBe("azure.url/cdtn/io.md");
  });

  test("should return a url from a url", () => {
    expect(toUrl("complete.url/dev/io.md")).toBe("azure.url/cdtn/io.md");
  });

  test("should return input if no match", () => {
    expect(toUrl("")).toBe("");
  });
});

describe("removeQueryParameters", () => {
  test("should transform a url to a canonical url", () => {
    const parsedUrl = removeQueryParameters(
      "/contribution/44-les-conges-pour-evenements-familiaux"
    );
    expect(parsedUrl).toBe(
      "/contribution/44-les-conges-pour-evenements-familiaux"
    );

    const parsedUrlWithParams = removeQueryParameters(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux?q=m&m=p"
    );
    expect(parsedUrlWithParams).toBe(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"
    );

    const parsedUrlWithDoubleQuestion = removeQueryParameters(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux??"
    );
    expect(parsedUrlWithDoubleQuestion).toBe(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"
    );

    const parsedUrlWithDoubleQuestionAndtext = removeQueryParameters(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux?ds=ds?"
    );
    expect(parsedUrlWithDoubleQuestionAndtext).toBe(
      "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"
    );
  });
});
