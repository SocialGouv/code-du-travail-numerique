import { test, expect } from "@playwright/test";

test.describe("Check security headers", () => {
  test("should contain security headers", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toBe(
      "noindex, nofollow, nosnippet"
    );
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
  });

  test("should contain security headers but not x-frame-options on widgets", async ({
    request,
  }) => {
    const widgetResponse = await request.get("/widgets/preavis-retraite");
    expect(widgetResponse.status()).toBe(200);
    expect(widgetResponse.headers()["x-robots-tag"]).toBe(
      "noindex, nofollow, nosnippet"
    );
    expect(widgetResponse.headers()["x-content-type-options"]).toBe("nosniff");
    expect(widgetResponse.headers()["x-frame-options"]).toBeUndefined();

    const widgetHtmlResponse = await request.get("/widget.html");
    expect(widgetHtmlResponse.status()).toBe(200);
    expect(widgetHtmlResponse.headers()["x-robots-tag"]).toBe(
      "noindex, nofollow, nosnippet"
    );
    expect(widgetHtmlResponse.headers()["x-content-type-options"]).toBe(
      "nosniff"
    );
    expect(widgetHtmlResponse.headers()["x-frame-options"]).toBeUndefined();
  });
});
