import { buildExtraction, serializeExtraction } from "../aggregate";
import type { ScanResult } from "../scanner";
import type { ExtractedEvent } from "../events.schema";

function ev(
  category: string,
  action: string,
  file: string,
  line: number
): ExtractedEvent {
  return {
    category,
    action,
    name_pattern: null,
    resolution: "literal",
    emit_function: null,
    file,
    line,
    enum_refs: [],
    tracking_method: "sendEvent",
  };
}

function scanResult(events: ExtractedEvent[]): ScanResult {
  return {
    events,
    unresolved: [],
    configCalls: [],
    callsiteKeys: new Set(events.map((e) => `${e.file}:${e.line}`)),
  };
}

describe("buildExtraction", () => {
  it("trie les events par category, action, file, line", () => {
    const out = buildExtraction(
      scanResult([
        ev("b", "y", "f", 2),
        ev("a", "z", "f", 5),
        ev("a", "z", "f", 1),
      ]),
      "root"
    );
    expect(
      out.events.map((e) => `${e.category}:${e.action}@${e.line}`)
    ).toEqual(["a:z@1", "a:z@5", "b:y@2"]);
  });

  it("calcule total, uniques, callsites et scan_root", () => {
    const out = buildExtraction(
      scanResult([
        ev("a", "z", "f", 1),
        ev("a", "z", "f", 5),
        ev("b", "y", "f", 2),
      ]),
      "root"
    );
    expect(out.total_events).toBe(3);
    expect(out.unique_events).toBe(2); // a:z et b:y
    expect(out.callsites).toBe(3);
    expect(out.scan_root).toBe("root");
  });

  it("trie les configCalls par command/file/line", () => {
    const scan = scanResult([]);
    scan.configCalls = [
      { command: "setB", args: [], file: "f", line: 1 },
      { command: "setA", args: [], file: "f", line: 2 },
    ];
    const out = buildExtraction(scan, "root");
    expect(out.matomo_config_calls.map((c) => c.command)).toEqual([
      "setA",
      "setB",
    ]);
  });
});

describe("serializeExtraction", () => {
  it("produit un JSON indenté à 2 espaces terminé par un saut de ligne", () => {
    const out = buildExtraction(scanResult([ev("a", "z", "f", 1)]), "root");
    const json = serializeExtraction(out);
    expect(json.endsWith("\n")).toBe(true);
    expect(json).toContain('  "scan_root": "root"');
    expect(JSON.parse(json)).toEqual(out);
  });

  it("est déterministe (même entrée → même sortie)", () => {
    const out = buildExtraction(scanResult([ev("a", "z", "f", 1)]), "root");
    expect(serializeExtraction(out)).toBe(serializeExtraction(out));
  });
});
