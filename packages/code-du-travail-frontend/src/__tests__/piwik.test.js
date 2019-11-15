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
  it("should set campaign if there is a campaign urlparam", () => {
    fakeLocation("https://code.travail.gouv.fr/?utm_campaign=fire");
    initPiwik({ siteId: "42", piwikUrl: "YO" });
    expect(global._paq).toMatchInlineSnapshot(`
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
          "setCampaignNameKey",
          "fire",
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

function fakeLocation(url) {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  const { host, hostname, href, origin, pathname, port, search, protocol } = a;
  delete window.location;
  global.location = {
    host,
    hostname,
    href,
    origin,
    pathname,
    protocol,
    port,
    search
  };
}
