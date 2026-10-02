import { COOKIE_CONFIG } from "../../analytics/config";
import {
  applyConsent,
  CONSENT_VERSION,
  CONSENT_VERSION_KEY,
  ConsentType,
  hasMatomoCookieConsent,
  hasValidConsent,
  initConsent,
  isMatomoOptedOut,
  saveConsent,
} from "../consent";

const REFUSED: ConsentType = {
  matomo: false,
  sea: false,
  matomoHeatmap: false,
};
const ACCEPTED: ConsentType = { matomo: true, sea: false, matomoHeatmap: true };

const paqCommands = (): string[] =>
  (window._paq as unknown[][]).map(([command]) => command as string);

const setCookie = (name: string) => {
  document.cookie = `${name}=1; path=/`;
};

const cookieNames = (): string[] =>
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter(Boolean);

const matomoCookieNames = (): string[] =>
  cookieNames().filter((name) => /^(_pk_|mtm_|matomo_)/.test(name));

const clearCookies = () => {
  cookieNames().forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

describe("consent / Matomo", () => {
  beforeEach(() => {
    window._paq = [];
    localStorage.clear();
    // Visiteur déjà passé par la réinitialisation de la version courante
    localStorage.setItem(CONSENT_VERSION_KEY, CONSENT_VERSION);
    clearCookies();
  });

  describe("refus", () => {
    it("garde le tracking actif sans cookie (disableCookies, pas d'optUserOut)", () => {
      saveConsent(REFUSED);

      const commands = paqCommands();
      expect(commands).toContain("disableCookies");
      expect(commands).toContain("forgetCookieConsentGiven");
      expect(commands).toContain("HeatmapSessionRecording::disable");
      expect(commands).not.toContain("optUserOut");
      expect(commands).not.toContain("forgetUserOptOut");
      expect(hasMatomoCookieConsent()).toBe(false);
    });

    it("supprime les cookies Matomo existants mais conserve l'opt-out explicite", () => {
      setCookie("_pk_id.1.abcd");
      setCookie("_pk_ses.1.abcd");
      setCookie("_pk_ref.1.abcd");
      setCookie("mtm_cookie_consent");
      setCookie("matomo_sessid");
      setCookie("mtm_consent_removed");
      setCookie("other_cookie");

      saveConsent(REFUSED);

      // ga-disable-* : cookie d'opt-out SEA posé par le refus, hors Matomo
      expect(
        cookieNames()
          .filter((name) => !name.startsWith("ga-disable-"))
          .sort()
      ).toEqual(["mtm_consent_removed", "other_cookie"]);
    });

    it("est réappliqué au chargement sans cookie", () => {
      saveConsent(REFUSED);
      window._paq = [];

      initConsent();

      expect(paqCommands()).toContain("disableCookies");
      expect(paqCommands()).not.toContain("optUserOut");
    });
  });

  describe("acceptation", () => {
    it("autorise les cookies", () => {
      saveConsent(ACCEPTED);

      const commands = paqCommands();
      expect(commands).toContain("rememberCookieConsentGiven");
      expect(commands).not.toContain("disableCookies");
      expect(commands).not.toContain("forgetUserOptOut");
      expect(hasMatomoCookieConsent()).toBe(true);
    });

    it("ne lève pas l'opt-out explicite et ne dépose aucun cookie", () => {
      setCookie("mtm_consent_removed");
      setCookie("_pk_id.1.abcd");

      saveConsent(ACCEPTED);

      const commands = paqCommands();
      expect(commands).not.toContain("forgetUserOptOut");
      expect(commands).not.toContain("rememberCookieConsentGiven");
      expect(commands).toContain("disableCookies");
      expect(hasMatomoCookieConsent()).toBe(false);
      expect(cookieNames()).not.toContain("_pk_id.1.abcd");
      expect(cookieNames()).toContain("mtm_consent_removed");
    });

    it("ne lève pas l'opt-out explicite au rechargement", () => {
      saveConsent(ACCEPTED);
      window._paq = [];

      initConsent();

      expect(paqCommands()).toContain("rememberCookieConsentGiven");
      expect(paqCommands()).not.toContain("forgetUserOptOut");
    });
  });

  describe("sans choix", () => {
    it("mesure sans déposer de cookie", () => {
      initConsent();

      const commands = paqCommands();
      expect(commands).toContain("disableCookies");
      expect(commands).not.toContain("rememberCookieConsentGiven");
      expect(commands).not.toContain("optUserOut");
      expect(hasMatomoCookieConsent()).toBe(false);
    });
  });

  describe("réinitialisation à chaque version du consentement", () => {
    // Choix enregistré par une version antérieure (sans clé de version)
    const storeLegacyConsent = (consent: ConsentType) => {
      localStorage.removeItem(CONSENT_VERSION_KEY);
      localStorage.setItem("cdtn-cookie-consent", JSON.stringify(consent));
      localStorage.setItem("cdtn-cookie-consent-given", "true");
      localStorage.setItem("cdtn-cookie-consent-date", Date.now().toString());
    };

    it.each([
      ["un refus", REFUSED],
      ["une acceptation", ACCEPTED],
    ])("redemande le choix après %s d'une version antérieure", (_, consent) => {
      storeLegacyConsent(consent);

      expect(hasValidConsent()).toBe(false);
    });

    it("oublie l'ancien choix et supprime tous les cookies Matomo, opt-out compris", () => {
      storeLegacyConsent(REFUSED);
      setCookie("_pk_id.1.abcd");
      setCookie("mtm_consent_removed");
      setCookie("other_cookie");

      initConsent();

      expect(localStorage.getItem("cdtn-cookie-consent")).toBeNull();
      expect(localStorage.getItem(CONSENT_VERSION_KEY)).toBe(CONSENT_VERSION);
      expect(matomoCookieNames()).toEqual([]);
      expect(cookieNames()).toContain("other_cookie");
      expect(paqCommands()).toContain("forgetUserOptOut");
      expect(paqCommands()).toContain("disableCookies");
      expect(hasValidConsent()).toBe(false);
    });

    it("ne réinitialise qu'une fois : un opt-out posé ensuite est conservé", () => {
      storeLegacyConsent(REFUSED);
      initConsent();

      setCookie("mtm_consent_removed");
      window._paq = [];
      initConsent();

      expect(isMatomoOptedOut()).toBe(true);
      expect(paqCommands()).not.toContain("forgetUserOptOut");
    });

    it("sans localStorage, ne supprime pas l'opt-out à chaque page", () => {
      localStorage.removeItem(CONSENT_VERSION_KEY);
      setCookie("mtm_consent_removed");
      const setItem = jest
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("localStorage indisponible");
        });
      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

      initConsent();

      expect(isMatomoOptedOut()).toBe(true);
      expect(paqCommands()).not.toContain("forgetUserOptOut");

      setItem.mockRestore();
      warn.mockRestore();
    });

    it("un choix fait après la réinitialisation est valide", () => {
      storeLegacyConsent(ACCEPTED);
      initConsent();

      saveConsent(ACCEPTED);

      expect(hasValidConsent()).toBe(true);
      expect(hasMatomoCookieConsent()).toBe(true);
    });
  });

  describe("isMatomoOptedOut", () => {
    it("détecte le cookie d'opt-out Matomo", () => {
      expect(isMatomoOptedOut()).toBe(false);

      setCookie("mtm_consent_removed");

      expect(isMatomoOptedOut()).toBe(true);
    });
  });
});

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
