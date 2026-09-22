import { test, expect } from "@playwright/test";
import { expectUrlEqual } from "./helpers";

test.describe("Redirects", () => {
  test("page: /convention-collective/650 should redirect to new meta", async ({
    page,
  }) => {
    await page.goto("/convention-collective/650");
    await expectUrlEqual(page, "/convention-collective/3248-metallurgie");
  });

  test("page: /information should permanently redirect to /contribution", async ({
    page,
    request,
  }) => {
    // Rubrique « Fiches pratiques » : les fiches infos y sont listées (#7464).
    const response = await request.get("/information", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toBe("/contribution");

    await page.goto("/information/");
    await expectUrlEqual(page, "/contribution");
  });
});
