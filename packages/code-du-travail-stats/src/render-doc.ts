// Rend le plan de tracking en markdown lisible par le métier, à partir de
// l'extraction JSON. Fonction PURE et DÉTERMINISTE (aucun timestamp, aucune IO)
// → le markdown peut être drift-checké par simple égalité de chaîne, comme le
// JSON. Les events sont regroupés par module/feature puis par catégorie Matomo.

import type { EventsExtraction, ExtractedEvent } from "./events.schema";
import { compact } from "./text-utils";
import { moduleOf } from "./doc-modules";

export type RenderOptions = {
  // Base des URLs GitHub (sans slash final), ex: https://github.com/org/repo.
  repoUrl: string;
  // Branche ciblée par les liens source (fixe → markdown déterministe).
  ref: string;
};

// Ancre GitHub d'un titre : minuscules, ponctuation retirée, espaces → tirets.
function anchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Échappe une valeur destinée à une cellule de tableau markdown : une seule
// ligne, et le pipe protégé (y compris dans un code-span GitHub).
function tableCell(value: string): string {
  return compact(value).replace(/\|/g, "\\|");
}

// Cellule "Name" : code-span, ou tiret si absent. Le backtick est neutralisé
// (il casserait le code-span) et le pipe échappé.
function nameCell(name: string | null): string {
  if (name === null) return "—";
  return "`" + tableCell(name).replace(/`/g, "'") + "`";
}

// Lien markdown vers la ligne de code émettrice (texte: fichier:ligne).
function sourceLink(file: string, line: number, opts: RenderOptions): string {
  const base = file.split("/").pop() ?? file;
  return `[${base}:${line}](${opts.repoUrl}/blob/${opts.ref}/${file}#L${line})`;
}

const byActionNameLine = (a: ExtractedEvent, b: ExtractedEvent) =>
  a.action.localeCompare(b.action) ||
  (a.name_pattern ?? "").localeCompare(b.name_pattern ?? "") ||
  a.file.localeCompare(b.file) ||
  a.line - b.line;

// Regroupe les events par module puis par catégorie (Maps insérées en vrac,
// triées à l'affichage).
function groupByModuleThenCategory(
  events: ExtractedEvent[]
): Map<string, Map<string, ExtractedEvent[]>> {
  const byModule = new Map<string, Map<string, ExtractedEvent[]>>();
  for (const e of events) {
    const mod = moduleOf(e.file);
    const byCat = byModule.get(mod) ?? new Map<string, ExtractedEvent[]>();
    const list = byCat.get(e.category) ?? [];
    list.push(e);
    byCat.set(e.category, list);
    byModule.set(mod, byCat);
  }
  return byModule;
}

const sortedKeys = <V>(m: Map<string, V>): string[] =>
  [...m.keys()].sort((a, b) => a.localeCompare(b));

function eventTable(events: ExtractedEvent[], opts: RenderOptions): string {
  const header = "| Action | Name | Type | Source |\n| --- | --- | --- | --- |";
  const rows = [...events]
    .sort(byActionNameLine)
    .map(
      (e) =>
        `| ${tableCell(e.action)} | ${nameCell(e.name_pattern)} | ${e.resolution} | ${sourceLink(e.file, e.line, opts)} |`
    );
  return [header, ...rows].join("\n");
}

function legend(): string {
  return [
    "## Légende",
    "",
    "- **Catégorie / Action** : les deux identifiants Matomo qui définissent l'event.",
    "- **Name** : libellé ou détail optionnel transmis avec l'event (`—` si absent).",
    "- **`<…>`** : valeur dynamique calculée à l'exécution (URL, requête saisie, titre d'outil…), non énumérable. Peut apparaître en Action comme en Name.",
    "- **Type** : `literal` (valeur écrite en dur), `enum-param` (une ligne par valeur possible d'un enum), `dynamic` (valeur calculée à l'exécution).",
    "- **Source** : lien vers la ligne de code qui émet l'event.",
  ].join("\n");
}

export function renderTrackingPlan(
  extraction: EventsExtraction,
  opts: RenderOptions
): string {
  const byModule = groupByModuleThenCategory(extraction.events);
  const modules = sortedKeys(byModule);

  const parts: string[] = [];

  parts.push("# Plan de tracking Matomo — CDTN");
  parts.push(
    [
      "> ⚠️ Fichier généré automatiquement à partir de `events.extracted.json` — ne pas éditer à la main.",
      "> Régénérer avec `pnpm -F @socialgouv/cdtn-stats doc:generate`.",
    ].join("\n")
  );
  parts.push(
    `**${extraction.unique_events}** events uniques · **${extraction.total_events}** events au total · **${modules.length}** modules.`
  );

  parts.push(legend());

  // Sommaire des modules.
  const toc = modules.map((mod) => {
    const count = [...byModule.get(mod)!.values()].reduce(
      (n, list) => n + list.length,
      0
    );
    return `- [${mod}](#${anchor(mod)}) — ${count} events`;
  });
  parts.push(["## Sommaire", "", ...toc].join("\n"));

  // Sections par module → catégorie → tableau.
  for (const mod of modules) {
    parts.push(`## ${mod}`);
    const byCat = byModule.get(mod)!;
    for (const cat of sortedKeys(byCat)) {
      parts.push(`### ${cat}\n\n${eventTable(byCat.get(cat)!, opts)}`);
    }
  }

  // Annexe : commandes de configuration Matomo (heatmap, A/B testing…).
  if (extraction.matomo_config_calls.length > 0) {
    const rows = extraction.matomo_config_calls.map(
      (c) => `| ${tableCell(c.command)} | ${sourceLink(c.file, c.line, opts)} |`
    );
    parts.push(
      [
        "## Annexe — commandes de configuration Matomo",
        "",
        "Réglages Matomo poussés par le code (non comptés comme events).",
        "",
        "| Commande | Source |",
        "| --- | --- |",
        ...rows,
      ].join("\n")
    );
  }

  // Annexe : appels de tracking non résolus (si l'extraction en a laissé).
  if (extraction.unresolved.length > 0) {
    const rows = extraction.unresolved.map(
      (u) => `| ${sourceLink(u.file, u.line, opts)} | ${tableCell(u.reason)} |`
    );
    parts.push(
      [
        "## Annexe — appels non résolus",
        "",
        "| Source | Raison |",
        "| --- | --- |",
        ...rows,
      ].join("\n")
    );
  }

  return parts.join("\n\n") + "\n";
}
