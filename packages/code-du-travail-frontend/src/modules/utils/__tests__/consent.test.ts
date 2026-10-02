import {
  ConsentType,
  hasMatomoCookieConsent,
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

const clearCookies = () => {
  cookieNames().forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

describe("consent / Matomo", () => {
  beforeEach(() => {
    window._paq = [];
    localStorage.clear();
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

  describe("migration des refus antérieurs (optUserOut)", () => {
    const storeConsent = (consent: ConsentType) => {
      localStorage.setItem("cdtn-cookie-consent", JSON.stringify(consent));
      localStorage.setItem("cdtn-cookie-consent-given", "true");
      localStorage.setItem("cdtn-cookie-consent-date", Date.now().toString());
    };

    it("lève une seule fois l'opt-out posé par un ancien refus du bandeau", () => {
      storeConsent(REFUSED);
      setCookie("mtm_consent_removed");

      initConsent();
      expect(paqCommands()).toContain("forgetUserOptOut");
      expect(paqCommands()).toContain("disableCookies");

      window._paq = [];
      initConsent();
      expect(paqCommands()).not.toContain("forgetUserOptOut");
    });

    it("conserve un opt-out explicite posé après la migration", () => {
      storeConsent(REFUSED);
      initConsent();

      setCookie("mtm_consent_removed");
      window._paq = [];
      initConsent();

      expect(paqCommands()).not.toContain("forgetUserOptOut");
    });

    it("conserve l'opt-out explicite d'un usager qui avait accepté", () => {
      storeConsent(ACCEPTED);
      setCookie("mtm_consent_removed");

      initConsent();

      expect(paqCommands()).not.toContain("forgetUserOptOut");
    });

    it("conserve l'opt-out explicite d'un usager sans choix dans le bandeau", () => {
      setCookie("mtm_consent_removed");

      initConsent();

      expect(paqCommands()).not.toContain("forgetUserOptOut");
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
