import { initPiwik, matopush } from "../piwik";

describe("initPiwik", () => {
  beforeEach(() => {
    global._paq = [];
  });
  it("should create a js tag", () => {
    // we need to add a fake script node so
    // initPiwik can insert piwik tracker code before it
    document.head.appendChild(document.createElement("script"));
    initPiwik({ siteId: "42", piwikUrl: "YO" });
    expect(global._paq).toMatchInlineSnapshot(`
      Array [
        Array [
          "trackPageView",
        ],
        Array [
          "enableLinkTracking",
        ],
        Array [
          "setTrackerUrl",
          "YO/matomo.php",
        ],
        Array [
          "setSiteId",
          "42",
        ],
      ]
    `);
  });
});

describe("matopush", () => {
  test("should append data to window._paq", () => {
    window._paq = [];
    matopush(["test"]);
    expect(window._paq).toMatchInlineSnapshot(`
      Array [
        Array [
          "test",
        ],
      ]
    `);
  });
});
