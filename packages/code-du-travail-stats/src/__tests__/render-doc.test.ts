import { renderTrackingPlan } from "../render-doc";
import type { EventsExtraction, ExtractedEvent } from "../events.schema";

const OPTS = { repoUrl: "https://github.com/org/repo", ref: "dev" };

const FRONT = "packages/code-du-travail-frontend/src/modules";

function ev(over: Partial<ExtractedEvent>): ExtractedEvent {
  return {
    category: "cat",
    action: "act",
    name_pattern: null,
    resolution: "literal",
    emit_function: null,
    file: `${FRONT}/enterprise/tracking.ts`,
    line: 1,
    enum_refs: [],
    tracking_method: "sendEvent",
    ...over,
  };
}

function extraction(over: Partial<EventsExtraction>): EventsExtraction {
  const events = over.events ?? [];
  return {
    scan_root: "packages/code-du-travail-frontend/src",
    callsites: events.length,
    total_events: events.length,
    unique_events: new Set(events.map((e) => `${e.category}:${e.action}`)).size,
    unresolved_callsites: 0,
    events,
    unresolved: [],
    matomo_config_calls: [],
    ...over,
  };
}

describe("renderTrackingPlan", () => {
  it("écrit l'en-tête, l'avertissement 'généré' et les comptages", () => {
    const md = renderTrackingPlan(
      extraction({
        events: [
          ev({ category: "a", action: "x", file: `${FRONT}/enterprise/t.ts` }),
          ev({ category: "b", action: "y", file: `${FRONT}/recherche/t.ts` }),
        ],
      }),
      OPTS
    );
    expect(md).toContain("# Plan de tracking Matomo — CDTN");
    expect(md.toLowerCase()).toContain("ne pas éditer à la main".toLowerCase());
    expect(md).toContain("**2** events uniques");
    expect(md).toContain("**2** modules");
  });

  it("groupe par module puis par catégorie avec une ligne de tableau par event", () => {
    const md = renderTrackingPlan(
      extraction({
        events: [
          ev({
            category: "accord_enterprise_search",
            action: "click_accord",
            name_pattern: "<url>",
            resolution: "literal",
            file: `${FRONT}/enterprise/EnterpriseAgreementSearch/accords/tracking.ts`,
            line: 13,
          }),
        ],
      }),
      OPTS
    );
    expect(md).toContain("## enterprise");
    expect(md).toContain("### accord_enterprise_search");
    expect(md).toContain(
      "| click_accord | `<url>` | literal | [tracking.ts:13](https://github.com/org/repo/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L13) |"
    );
  });

  it("affiche — quand le name est absent", () => {
    const md = renderTrackingPlan(
      extraction({
        events: [
          ev({ action: "noname", name_pattern: null, resolution: "dynamic" }),
        ],
      }),
      OPTS
    );
    expect(md).toContain("| noname | — | dynamic |");
  });

  it("échappe les pipes dans la colonne name", () => {
    const md = renderTrackingPlan(
      extraction({ events: [ev({ action: "piped", name_pattern: "a|b" })] }),
      OPTS
    );
    expect(md).toContain("| piped | `a\\|b` |");
  });

  it("liste les modules dans le sommaire avec une ancre", () => {
    const md = renderTrackingPlan(
      extraction({
        events: [ev({ file: `${FRONT}/enterprise/t.ts` })],
      }),
      OPTS
    );
    expect(md).toContain("- [enterprise](#enterprise)");
  });

  it("rend l'annexe des commandes de configuration seulement si présentes", () => {
    const withConfig = renderTrackingPlan(
      extraction({
        events: [ev({})],
        matomo_config_calls: [
          {
            command: "HeatmapSessionRecording::enable",
            args: [],
            file: `${FRONT}/config/x.ts`,
            line: 5,
          },
        ],
      }),
      OPTS
    );
    expect(withConfig).toContain("HeatmapSessionRecording::enable");

    const without = renderTrackingPlan(extraction({ events: [ev({})] }), OPTS);
    expect(without).not.toContain("configuration Matomo");
  });

  it("est déterministe (même entrée → même sortie) et termine par un saut de ligne", () => {
    const e = extraction({
      events: [
        ev({ category: "b", action: "y", file: `${FRONT}/recherche/t.ts` }),
        ev({ category: "a", action: "x", file: `${FRONT}/enterprise/t.ts` }),
      ],
    });
    const a = renderTrackingPlan(e, OPTS);
    const b = renderTrackingPlan(e, OPTS);
    expect(a).toBe(b);
    expect(a.endsWith("\n")).toBe(true);
  });
});
