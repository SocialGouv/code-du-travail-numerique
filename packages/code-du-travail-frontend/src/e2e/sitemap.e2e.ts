import { test, expect } from "@playwright/test";

test.describe("Sitemap", () => {
  test("should be visible", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<loc>https://code.travail.gouv.fr/</loc>");
  });
});
