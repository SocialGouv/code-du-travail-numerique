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

// Le socle normalisé (`modules/analytics/events`) n'expose PAS la catégorie à
// l'appelant : elle est déduite de la route courante au runtime. C'est ce qui
// rend la convention impossible à contourner par oubli, et c'est aussi ce qui
// la rend non résoluble statiquement.
describe("scanSourceFiles — socle normalisé (track / sendPageEvent)", () => {
  const withSocle = (body: string) =>
    `import { useTracking } from "src/modules/analytics/events/useTracking";\n${body}`;

  it("extrait l'action et la forme du payload", () => {
    const res = scan(
      withSocle(
        `const emit = () => { track("click_share", { network: "facebook" }); };`
      )
    );

    expect(res.events).toHaveLength(1);
    expect(res.events[0]).toMatchObject({
      category: "<PageCategory>",
      action: "click_share",
      name_pattern: "{path, network}",
      resolution: "dynamic",
      emit_function: "emit",
      tracking_method: "track",
      has_value: false,
    });
  });

  it("ordonne les clés du payload comme la sérialisation : path puis alphabétique", () => {
    const res = scan(
      withSocle(`track("view_step", { step: "s", simulator: "x" });`)
    );

    expect(res.events[0].name_pattern).toBe("{path, simulator, step}");
  });

  it("suppose le path même quand l'appelant ne passe aucun payload", () => {
    const res = scan(withSocle(`track("view_answer");`));

    expect(res.events[0].name_pattern).toBe("{path}");
  });

  it("repère les events qui renseignent la value Matomo", () => {
    const res = scan(
      withSocle(`track("show_enterprise_accords", { count }, count);`)
    );

    expect(res.events[0].has_value).toBe(true);
  });

  it("reconnaît sendPageEvent, l'émetteur hors React", () => {
    const res = scan(
      `import { sendPageEvent } from "src/modules/analytics/events";
       sendPageEvent("select_agreement_p1", { idcc, context });`
    );

    expect(res.events[0]).toMatchObject({
      category: "<PageCategory>",
      action: "select_agreement_p1",
      name_pattern: "{path, context, idcc}",
      tracking_method: "sendPageEvent",
    });
  });

  // `track` est un nom courant : sans ce garde-fou, n'importe quelle fonction
  // locale ainsi nommée polluerait le catalogue.
  it("ignore un track() d'un fichier qui n'importe pas le socle", () => {
    const res = scan(`track("pas_un_event", { foo: 1 });`);

    expect(res.events).toHaveLength(0);
  });

  it("relève un appel sans action comme non résolu", () => {
    const res = scan(withSocle(`track();`));

    expect(res.events).toHaveLength(0);
    expect(res.unresolved[0].reason).toContain("sans action");
  });
});
