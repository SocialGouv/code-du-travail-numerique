// Agrégation finale : tri déterministe des listes, comptages, et sérialisation
// du résultat. Volontairement sans IO ni timestamp → le drift check compare ce
// JSON par égalité stricte.

import type { EventsExtraction } from "./events.schema";
import { EVENT_KEY } from "./events.schema";
import type { ScanResult } from "./scanner";

const byCatActionFileLine = (
  a: { category: string; action: string; file: string; line: number },
  b: { category: string; action: string; file: string; line: number }
) =>
  a.category.localeCompare(b.category) ||
  a.action.localeCompare(b.action) ||
  a.file.localeCompare(b.file) ||
  a.line - b.line;

// Trie les listes du scan, calcule les comptages et assemble l'objet final.
export function buildExtraction(
  scan: ScanResult,
  scanRoot: string
): EventsExtraction {
  const { events, unresolved, configCalls, callsiteKeys } = scan;

  events.sort(byCatActionFileLine);
  configCalls.sort(
    (a, b) =>
      a.command.localeCompare(b.command) ||
      a.file.localeCompare(b.file) ||
      a.line - b.line
  );
  unresolved.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

  const uniqueKeys = new Set(events.map((e) => EVENT_KEY(e)));

  return {
    scan_root: scanRoot,
    callsites: callsiteKeys.size,
    total_events: events.length,
    unique_events: uniqueKeys.size,
    unresolved_callsites: unresolved.length,
    events,
    unresolved,
    matomo_config_calls: configCalls,
  };
}

// Sérialisation déterministe (pas de timestamp) : drift check = égalité stricte.
export function serializeExtraction(extraction: EventsExtraction): string {
  return JSON.stringify(extraction, null, 2) + "\n";
}
