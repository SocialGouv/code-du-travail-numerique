// Rend le plan de tracking en markdown lisible par le métier, à partir de
// l'extraction JSON. Fonction PURE et DÉTERMINISTE (aucun timestamp, aucune IO)
// → le markdown peut être drift-checké par simple égalité de chaîne, comme le
// JSON. Les events sont regroupés par module/feature puis par catégorie Matomo.

import type {
  EventResolution,
  EventsExtraction,
  ExtractedEvent,
} from "./events.schema";
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

// Protège les pipes (séparateurs de colonne, y compris dans un code-span) sans
// recourir à un replace dont le motif de remplacement contient un backslash :
// split/join évite le faux positif « échappement incomplet » de CodeQL et, à la
// différence du backslash-escaping, ne double pas les backslashes de l'entrée
// (indispensable dans un code-span où ils sont littéraux).
const escapePipes = (s: string): string => s.split("|").join("\\|");

// Échappe une valeur destinée à une cellule de tableau markdown en texte brut :
// une seule ligne, backslash PUIS pipe protégés (l'ordre compte — un backslash
// de l'entrée ne doit pas neutraliser l'échappement du pipe).
function tableCell(value: string): string {
  return escapePipes(compact(value).replace(/\\/g, "\\\\"));
}

// Cellule en code-span (monospace). Indispensable pour les valeurs `<…>` :
// sans backticks, GitHub les prend pour des balises HTML et les affiche VIDES.
// Dans un code-span le backslash est littéral (on ne le double pas) ; seuls le
// backtick (qui casserait le span) et le pipe sont neutralisés.
function codeCell(value: string): string {
  return "`" + escapePipes(compact(value).replace(/`/g, "'")) + "`";
}

// Cellule "Name" : code-span, ou tiret si absent.
function nameCell(name: string | null): string {
  return name === null ? "—" : codeCell(name);
}

// Lien markdown compact (↗) vers la ligne de code émettrice. Le `fichier:ligne`
// est mis en title → visible au survol, sans alourdir le tableau.
function sourceLink(file: string, line: number, opts: RenderOptions): string {
  const base = file.split("/").pop() ?? file;
  return `[↗](${opts.repoUrl}/blob/${opts.ref}/${file}#L${line} "${base}:${line}")`;
}

// Repère métier de la valeur de l'event : variable (calculée à l'exécution) vs
// fixe (littéral ou énuméré).
function valueMark(resolution: EventResolution): string {
  return resolution === "dynamic" ? "🔀" : "📌";
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

// Compte lisible : « 1 event », « 3 events ».
const plural = (n: number, word: string): string =>
  `${n} ${word}${n > 1 ? "s" : ""}`;

function eventTable(events: ExtractedEvent[], opts: RenderOptions): string {
  const header = "| Action | Name |  | Code |\n| --- | --- | --- | --- |";
  const rows = [...events]
    .sort(byActionNameLine)
    .map(
      (e) =>
        `| ${codeCell(e.action)} | ${nameCell(e.name_pattern)} | ${valueMark(e.resolution)} | ${sourceLink(e.file, e.line, opts)} |`
    );
  return [header, ...rows].join("\n");
}

function legend(): string {
  return [
    "## Légende",
    "",
    "Les events sont regroupés par module, puis par catégorie Matomo.",
    "",
    "- **📌 / 🔀** (3ᵉ colonne) : 📌 = action **fixe** (event clairement identifié) ; 🔀 = action **calculée à l'exécution** (une famille d'events). Le *name*, lui, peut varier (`<…>`) dans les deux cas.",
    "- **Action / catégorie** : les deux identifiants Matomo qui définissent l'event.",
    "- **Name** : libellé ou détail transmis avec l'event (`—` si absent).",
    "- **`<…>`** : emplacement d'une valeur calculée à l'exécution (URL, requête saisie, titre d'outil…), non énumérable.",
    "- **Code** : lien ↗ vers la ligne qui émet l'event (le `fichier:ligne` s'affiche au survol).",
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
    return `- [${mod}](#${anchor(mod)}) — ${plural(count, "event")}`;
  });
  parts.push(["## Sommaire", "", ...toc].join("\n"));

  // Sections par module → catégorie → tableau (tout affiché, sans repli).
  // Le titre de module reste un `##` sans emoji pour garder des ancres GitHub
  // valides (un emoji dans le titre casserait les liens du sommaire).
  for (const mod of modules) {
    parts.push(`## ${mod}`);
    const byCat = byModule.get(mod)!;
    for (const cat of sortedKeys(byCat)) {
      const list = byCat.get(cat)!;
      parts.push(
        `### 📂 ${cat} · ${plural(list.length, "event")}\n\n${eventTable(list, opts)}`
      );
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
