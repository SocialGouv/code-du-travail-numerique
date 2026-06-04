import { scanSourceFiles } from "../scanner";
import type { ScanResult } from "../scanner";
import { buildEnumIndex } from "../enum-index";
import { buildCallIndex } from "../call-index";
import { createResolver } from "../value-resolver";
import { makeProject } from "./ast-test-helpers";

// Scanne un bout de code en mémoire. Le repoRoot "/" rend les chemins relatifs
// à "input.ts".
function scan(code: string): ScanResult {
  const { project } = makeProject(code);
  const files = project.getSourceFiles();
  const resolver = createResolver(buildEnumIndex(files), buildCallIndex(files));
  return scanSourceFiles(files, resolver, "/");
}

describe("scanSourceFiles — sendEvent", () => {
  it("extrait un event littéral avec son émetteur et son fichier", () => {
    const res = scan(
      `const handler = () => { sendEvent({ category: "outil", action: "click", name: "n" }); };`
    );
    expect(res.events).toHaveLength(1);
    expect(res.events[0]).toMatchObject({
      category: "outil",
      action: "click",
      name_pattern: "n",
      resolution: "literal",
      emit_function: "handler",
      tracking_method: "sendEvent",
      file: "input.ts",
      enum_refs: [],
    });
    expect(res.callsiteKeys.size).toBe(1);
  });

  it("déplie un paramètre typé enum en un event par valeur", () => {
    const res = scan(`
      enum E { A = "a", B = "b" }
      function f(action: E) { sendEvent({ category: "c", action }); }
    `);
    expect(res.events.map((e) => `${e.category}:${e.action}`).sort()).toEqual([
      "c:a",
      "c:b",
    ]);
    expect(res.events.every((e) => e.resolution === "enum-param")).toBe(true);
  });

  it("relève un argument non-objet comme non résolu", () => {
    const res = scan(`sendEvent("oops");`);
    expect(res.events).toHaveLength(0);
    expect(res.unresolved).toHaveLength(1);
    expect(res.unresolved[0].reason).toMatch(/non-objet-littéral/);
  });

  it("relève une category/action manquante", () => {
    expect(scan(`sendEvent({ category: "c" });`).unresolved[0].reason).toBe(
      "Missing action"
    );
    expect(scan(`sendEvent({ action: "a" });`).unresolved[0].reason).toBe(
      "Missing category"
    );
  });
});

describe("scanSourceFiles — push Matomo natif", () => {
  it("trackEvent → category/action/name depuis le tableau", () => {
    const res = scan(`_paq.push(["trackEvent", "Cat", "Action", "Name"]);`);
    expect(res.events).toHaveLength(1);
    expect(res.events[0]).toMatchObject({
      category: "Cat",
      action: "Action",
      name_pattern: "Name",
      tracking_method: "push:trackEvent",
    });
  });

  it("trackSiteSearch → category préfixée _matomo_", () => {
    const res = scan(`window._paq.push(["trackSiteSearch", "keyword"]);`);
    expect(res.events[0]).toMatchObject({
      category: "_matomo_trackSiteSearch",
      action: "keyword",
      tracking_method: "push:trackSiteSearch",
    });
  });

  it("commande de configuration → matomo_config_calls, pas un event", () => {
    const res = scan(`_paq.push(["setReferrerUrl", "http://x"]);`);
    expect(res.events).toHaveLength(0);
    expect(res.configCalls).toEqual([
      {
        command: "setReferrerUrl",
        args: ["http://x"],
        file: "input.ts",
        line: 1,
      },
    ]);
  });
});

describe("scanSourceFiles — gtag (Google SEA)", () => {
  it("gtag('event', ...) → other_tracking google-gtag", () => {
    const res = scan(`gtag("event", "conversion", { send_to: "AW-123" });`);
    expect(res.otherTracking).toEqual([
      {
        system: "google-gtag",
        event: "conversion",
        detail: "AW-123",
        file: "input.ts",
        line: 1,
      },
    ]);
  });

  it("ignore gtag('config', ...) (pas un event)", () => {
    const res = scan(`gtag("config", "AW-123");`);
    expect(res.otherTracking).toHaveLength(0);
  });
});

describe("scanSourceFiles — trackAppRouter (auto-tracking)", () => {
  it("liste pageview et link tracking par défaut", () => {
    const res = scan(`trackAppRouter({ siteId: "1" });`);
    expect(res.frameworkAuto).toHaveLength(1);
    expect(res.frameworkAuto[0].installer).toBe("trackAppRouter");
    expect(res.frameworkAuto[0].auto_events).toEqual([
      "trackPageView (changement de route SPA)",
      "outlink / download (enableLinkTracking par défaut)",
    ]);
  });

  it("ajoute site search et A/B selon la config", () => {
    const res = scan(`trackAppRouter({ searchKeyword: "q", abTests: [] });`);
    expect(res.frameworkAuto[0].auto_events).toEqual([
      "trackPageView (changement de route SPA)",
      "trackSiteSearch (searchKeyword)",
      "AbTesting (A/B content tracking)",
      "outlink / download (enableLinkTracking par défaut)",
    ]);
  });
});
