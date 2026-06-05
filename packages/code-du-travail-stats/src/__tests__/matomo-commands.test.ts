import { EVENT_COMMANDS, isMatomoPushCallee } from "../matomo-commands";

describe("EVENT_COMMANDS", () => {
  it("contient les commandes Matomo produisant un event", () => {
    expect(EVENT_COMMANDS.has("trackEvent")).toBe(true);
    expect(EVENT_COMMANDS.has("trackSiteSearch")).toBe(true);
    expect(EVENT_COMMANDS.has("trackContentInteraction")).toBe(true);
  });

  it("ne contient pas les commandes de configuration", () => {
    expect(EVENT_COMMANDS.has("setReferrerUrl")).toBe(false);
    expect(EVENT_COMMANDS.has("optUserOut")).toBe(false);
  });
});

describe("isMatomoPushCallee", () => {
  it.each(["push", "_paq.push", "window._paq.push", "paq.push"])(
    "reconnaît %s",
    (callee) => {
      expect(isMatomoPushCallee(callee)).toBe(true);
    }
  );

  it("reconnaît tout suffixe ._paq.push", () => {
    expect(isMatomoPushCallee("globalThis._paq.push")).toBe(true);
  });

  it("rejette un callee non-Matomo", () => {
    expect(isMatomoPushCallee("sendEvent")).toBe(false);
    expect(isMatomoPushCallee("array.push")).toBe(false);
  });
});
