import { getCanonicalUrl } from "../utils";

test("should transform a url to a canonical url", () => {
  const parsedUrl = getCanonicalUrl(
    "/contribution/44-les-conges-pour-evenements-familiaux"
  );
  expect(parsedUrl).toBe("/contribution/les-conges-pour-evenements-familiaux");

  const parsedUrlWithOrigin = getCanonicalUrl(
    "https://code.travail.gouv.fr/contribution/12-les-conges-pour-evenements-familiaux"
  );
  expect(parsedUrlWithOrigin).toBe(
    "https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux"
  );

  const parsedUrlWithOriginNumber = getCanonicalUrl(
    "https://code.travail.gouv.fr/contribution/les-conges-10-pour-evenements-familiaux"
  );
  expect(parsedUrlWithOriginNumber).toBe(
    "https://code.travail.gouv.fr/contribution/les-conges-pour-evenements-familiaux"
  );
});
