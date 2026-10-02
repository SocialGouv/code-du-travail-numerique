import { COOKIE_CONFIG } from "../../analytics/config";
import { applyConsent } from "../consent";

const getGtmScript = () =>
  document.getElementById("gtm-script") as HTMLScriptElement | null;

const getGtagCalls = () =>
  (window.dataLayer ?? []).map((args) => Array.from(args as ArrayLike<any>));

const consent = (sea: boolean) => ({
  matomo: false,
  matomoHeatmap: false,
  sea,
});

describe("SEA consent (campagne 2026)", () => {
  const originalAds = COOKIE_CONFIG.ads;

  beforeEach(() => {
    COOKIE_CONFIG.ads = true;
    getGtmScript()?.remove();
    window.dataLayer = [];
  });

  afterAll(() => {
    COOKIE_CONFIG.ads = originalAds;
    window.history.pushState({}, "", "/");
  });

  it("charge la balise Floodlight et envoie la conversion 2026 sur n'importe quelle page", () => {
    window.history.pushState({}, "", "/fiche-service-public/conge-paternite");

    applyConsent(consent(true));

    expect(getGtmScript()?.src).toBe(
      "https://www.googletagmanager.com/gtag/js?id=DC-3048978"
    );
    expect(getGtagCalls()).toContainEqual(["config", "DC-3048978"]);
    expect(getGtagCalls()).toContainEqual([
      "event",
      "conversion",
      {
        allow_custom_scripts: true,
        send_to: "DC-3048978/cdtn/2026-0+unique",
      },
    ]);
  });

  it("ne charge rien sans consentement", () => {
    window.history.pushState({}, "", "/");

    applyConsent(consent(false));

    expect(getGtmScript()).toBeNull();
    expect(window.dataLayer).toEqual([]);
    expect(document.cookie).toContain("ga-disable-DC-3048978=true");
  });

  it("ne charge rien dans les widgets", () => {
    window.history.pushState({}, "", "/widgets/search");

    applyConsent(consent(true));

    expect(getGtmScript()).toBeNull();
  });

  it("ne charge rien quand la campagne est désactivée", () => {
    COOKIE_CONFIG.ads = false;
    window.history.pushState({}, "", "/");

    applyConsent(consent(true));

    expect(getGtmScript()).toBeNull();
  });
});
