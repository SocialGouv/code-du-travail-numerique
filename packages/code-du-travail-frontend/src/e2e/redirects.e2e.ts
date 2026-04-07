import { test, expect } from "@playwright/test";
import { expectUrlEqual } from "./helpers";

test.describe("Redirects", () => {
  test("page: /convention-collective/650 should redirect to new meta", async ({
    page,
  }) => {
    await page.goto("/convention-collective/650");
    await expectUrlEqual(page, "/convention-collective/3248-metallurgie");
  });
});
