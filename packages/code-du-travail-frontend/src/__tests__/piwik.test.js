import { initPiwik, matopush } from "../piwik";

describe("initPiwik", () => {
  it("should create a js tag", () => {
    // we need to add a fake script node so
    // initPiwik can insert piwik tracker code before it
    document.head.appendChild(document.createElement("script"));
    initPiwik({ siteId: "42", piwikUrl: "YO" });
    expect(window._paq).toMatchInlineSnapshot(`
Array [
  Array [
    "setSiteId",
    "42",
  ],
  Array [
    "setTrackerUrl",
    "YO/piwik.php",
  ],
  Array [
    "enableLinkTracking",
  ],
  Array [
    "setCustomUrl",
    "/",
  ],
  Array [
    "trackPageView",
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
