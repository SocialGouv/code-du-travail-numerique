import { test } from "@playwright/test";
import { expectCanonicalUrlEqual } from "./helpers";

test.describe("Référencement", () => {
  test("vérification des balises canonical", async ({ page }) => {
    await page.goto("/");
    await expectCanonicalUrlEqual(page, "/");

    await page.goto("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
    await expectCanonicalUrlEqual(
      page,
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    await page.goto(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
    await expectCanonicalUrlEqual(
      page,
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    await page.goto(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd?queryParam=ab"
    );
    await expectCanonicalUrlEqual(
      page,
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
  });
});
