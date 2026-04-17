// generate-events-doc.ts
// ----------------------------------------------------------------------------
// Joint events/events.extracted.json (ground truth technique) et
// events/events.metadata.yaml (description metier) et produit docs/events.md
// groupé par feature_group, avec sections "Orphelins" (code sans metadata) et
// "Metadata orpheline" (metadata sans code correspondant).
//
// Fichier auto-genere : la bannière en tete de docs/events.md doit dissuader
// l'edition manuelle. check-events-drift.ts valide que le fichier est a jour.
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as YAML from "yaml";
import type { EventMetadata } from "./events.schema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const METABASE_DIR = path.resolve(__dirname, "..");
const EXTRACTED_PATH = path.join(METABASE_DIR, "events/events.extracted.json");
const METADATA_PATH = path.join(METABASE_DIR, "events/events.metadata.yaml");
const OUTPUT_PATH = path.join(METABASE_DIR, "docs/events.md");

type ExtractedEvent = {
  category: string;
  action: string;
  name_pattern: string | null;
  emit_function: string | null;
  file: string;
  line: number;
  enum_refs: string[];
  tracking_method: string;
};

type MatomoConfigCall = {
  command: string;
  args: string[];
  file: string;
  line: number;
};

type Extraction = {
  generated_at: string;
  scan_root: string;
  total_callsites: number;
  unique_events: number;
  unresolved_callsites: number;
  events: ExtractedEvent[];
  unresolved: { file: string; line: number; reason: string }[];
  matomo_config_calls?: MatomoConfigCall[];
};

if (!fs.existsSync(EXTRACTED_PATH)) {
  console.error(
    `[generate-events-doc] Introuvable: ${EXTRACTED_PATH}. Lance d'abord 'pnpm events:extract'.`
  );
  process.exit(1);
}

const extraction: Extraction = JSON.parse(fs.readFileSync(EXTRACTED_PATH, "utf8"));
const metadataRaw = fs.existsSync(METADATA_PATH)
  ? fs.readFileSync(METADATA_PATH, "utf8")
  : "";
const metadata: Record<string, EventMetadata> =
  YAML.parse(metadataRaw) ?? {};

function lookupMetadata(
  category: string,
  action: string
): EventMetadata | null {
  const exactKey = `${category}:${action}`;
  if (metadata[exactKey]) return metadata[exactKey];
  const wildKey = `${category}:*`;
  if (metadata[wildKey]) return metadata[wildKey];
  return null;
}

// Regrouper les callsites par event unique (category:action)
const byEvent = new Map<string, ExtractedEvent[]>();
for (const e of extraction.events) {
  const key = `${e.category}:${e.action}`;
  const arr = byEvent.get(key) ?? [];
  arr.push(e);
  byEvent.set(key, arr);
}

type DocumentedEvent = {
  category: string;
  action: string;
  metadata: EventMetadata;
  callsites: ExtractedEvent[];
  matched_wildcard: boolean;
};

const documented: DocumentedEvent[] = [];
const orphanEvents: ExtractedEvent[][] = [];

for (const [key, callsites] of byEvent) {
  const colonIdx = key.indexOf(":");
  const category = key.slice(0, colonIdx);
  const action = key.slice(colonIdx + 1);
  const meta = lookupMetadata(category, action);
  if (meta) {
    documented.push({
      category,
      action,
      metadata: meta,
      callsites,
      matched_wildcard: !metadata[`${category}:${action}`],
    });
  } else {
    orphanEvents.push(callsites);
  }
}

// Metadata sans event correspondant
const extractedKeys = new Set(byEvent.keys());
const extractedCategories = new Set(
  [...byEvent.keys()].map((k) => k.split(":")[0])
);
const metadataOrphans: { key: string; meta: EventMetadata }[] = [];
for (const [key, meta] of Object.entries(metadata)) {
  if (key.endsWith(":*")) {
    const cat = key.slice(0, -2);
    if (!extractedCategories.has(cat)) metadataOrphans.push({ key, meta });
  } else if (!extractedKeys.has(key)) {
    metadataOrphans.push({ key, meta });
  }
}

// Regrouper par feature_group
const byGroup = new Map<string, DocumentedEvent[]>();
for (const ev of documented) {
  const group = ev.metadata.feature_group ?? "uncategorized";
  const arr = byGroup.get(group) ?? [];
  arr.push(ev);
  byGroup.set(group, arr);
}

function anchor(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapePipe(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
}

const lines: string[] = [];

lines.push(
  "<!-- AUTO-GENERATED par events/generate-events-doc.ts — NE PAS EDITER A LA MAIN -->"
);
lines.push(
  "<!-- Regenerer : pnpm -F @cdt/metabase events:docs -->"
);
lines.push(
  "<!-- Source technique : events/events.extracted.json (AST scan) -->"
);
lines.push(
  "<!-- Description metier : events/events.metadata.yaml (a maintenir) -->"
);
lines.push("");
lines.push("# Glossaire des Events Matomo");
lines.push("");
lines.push(
  `Genere le **${extraction.generated_at}** depuis \`${extraction.scan_root}\`.`
);
lines.push("");
lines.push(
  `**Stats :** ${extraction.total_callsites} callsites · ${extraction.unique_events} events uniques · **${documented.length} documentes** · **${orphanEvents.length} orphelins** · ${metadataOrphans.length} metadata orphelines.`
);
lines.push("");
lines.push(
  "> Cette page est le point d'entree unique pour comprendre les events trackes par le frontend CDTN et leur usage dans les dashboards Metabase. Chaque entree est extraite statiquement depuis le code TS puis enrichie avec la description metier maintenue dans `events/events.metadata.yaml`."
);
lines.push("");
lines.push("## Sommaire");
lines.push("");
for (const group of [...byGroup.keys()].sort()) {
  lines.push(
    `- [${group}](#${anchor(group)}) (${byGroup.get(group)!.length})`
  );
}
if (orphanEvents.length > 0) {
  lines.push(`- [Orphelins](#orphelins) (${orphanEvents.length})`);
}
if (metadataOrphans.length > 0) {
  lines.push(
    `- [Metadata orpheline](#metadata-orpheline) (${metadataOrphans.length})`
  );
}
const totalConfigCalls = extraction.matomo_config_calls?.length ?? 0;
if (totalConfigCalls > 0) {
  lines.push(
    `- [Commandes Matomo de configuration](#commandes-matomo-de-configuration-non-events) (${totalConfigCalls})`
  );
}
if (extraction.unresolved_callsites > 0) {
  lines.push(
    `- [Callsites non-resolus](#callsites-non-resolus) (${extraction.unresolved_callsites})`
  );
}
lines.push("");
lines.push("---");
lines.push("");

for (const group of [...byGroup.keys()].sort()) {
  lines.push(`## ${group}`);
  lines.push("");
  const events = byGroup
    .get(group)!
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        a.action.localeCompare(b.action)
    );
  for (const ev of events) {
    lines.push(`### \`${ev.category}\` / \`${ev.action}\``);
    lines.push("");
    lines.push(ev.metadata.label_fr);
    lines.push("");
    lines.push(`- **Declenche par :** ${ev.metadata.trigger}`);
    if (ev.metadata.kpi) lines.push(`- **KPI :** ${ev.metadata.kpi}`);
    if (ev.metadata.dashboards?.length) {
      lines.push(
        `- **Dashboards :** ${ev.metadata.dashboards
          .map((d) => `#${d}`)
          .join(", ")}`
      );
    }
    if (ev.metadata.cards?.length) {
      lines.push(
        `- **Cartes :** ${ev.metadata.cards.map((c) => `#${c}`).join(", ")}`
      );
    }
    if (ev.metadata.mv_source) {
      lines.push(`- **MV source :** \`${ev.metadata.mv_source}\``);
    }
    if (ev.metadata.since) {
      lines.push(`- **Depuis :** ${ev.metadata.since}`);
    }
    if (ev.metadata.deprecated) {
      lines.push(`- **Deprecated :** oui`);
    }
    if (ev.metadata.notes) {
      lines.push(`- **Notes :** ${ev.metadata.notes}`);
    }
    if (ev.matched_wildcard) {
      lines.push(
        `- **Metadata :** herite de \`${ev.category}:*\` (generique de categorie)`
      );
    }
    const methods = new Set(ev.callsites.map((c) => c.tracking_method));
    if (methods.size === 1 && methods.has("sendEvent")) {
      // default case, pas besoin d'alourdir
    } else {
      lines.push(
        `- **Methode :** ${[...methods].sort().join(", ")}`
      );
    }
    lines.push(
      `- **Callsites :** ${ev.callsites.length}`
    );
    for (const c of ev.callsites) {
      const name = c.name_pattern ? ` — name: \`${c.name_pattern}\`` : "";
      const fn = c.emit_function ? ` (\`${c.emit_function}()\`)` : "";
      const method =
        c.tracking_method !== "sendEvent" ? ` · \`${c.tracking_method}\`` : "";
      lines.push(`  - \`${c.file}:${c.line}\`${fn}${method}${name}`);
    }
    lines.push("");
  }
}

if (orphanEvents.length > 0) {
  lines.push("## Orphelins");
  lines.push("");
  lines.push(
    "Events emis par le code **sans description metier** dans `events/events.metadata.yaml`."
  );
  lines.push(
    "**Action requise :** completer la metadata pour chaque entree (cle `\"<category>:<action>\"`) puis relancer `pnpm events:docs`."
  );
  lines.push("");
  lines.push("| category | action | callsites |");
  lines.push("| --- | --- | --- |");
  const sorted = orphanEvents.sort((a, b) =>
    `${a[0].category}:${a[0].action}`.localeCompare(
      `${b[0].category}:${b[0].action}`
    )
  );
  for (const callsites of sorted) {
    const e = callsites[0];
    const sites = callsites
      .map((c) => `\`${c.file}:${c.line}\``)
      .join("<br>");
    lines.push(
      `| \`${escapePipe(e.category)}\` | \`${escapePipe(e.action)}\` | ${sites} |`
    );
  }
  lines.push("");
}

if (metadataOrphans.length > 0) {
  lines.push("## Metadata orpheline");
  lines.push("");
  lines.push(
    "Entrees de `events/events.metadata.yaml` **sans callsite correspondant** dans le code. Deux cas possibles :"
  );
  lines.push("");
  lines.push(
    "1. L'event a ete supprime du code → supprimer l'entree de la metadata."
  );
  lines.push(
    "2. L'event existe encore mais sous une autre category/action → corriger la cle."
  );
  lines.push("");
  lines.push("| cle | label | feature_group |");
  lines.push("| --- | --- | --- |");
  for (const { key, meta } of metadataOrphans.sort((a, b) =>
    a.key.localeCompare(b.key)
  )) {
    lines.push(
      `| \`${escapePipe(key)}\` | ${escapePipe(meta.label_fr)} | ${escapePipe(
        meta.feature_group
      )} |`
    );
  }
  lines.push("");
}

const configCalls = extraction.matomo_config_calls ?? [];
if (configCalls.length > 0) {
  lines.push("## Commandes Matomo de configuration (non-events)");
  lines.push("");
  lines.push(
    "Appels a `push([...])` ou `_paq.push([...])` qui configurent le tracker Matomo **sans emettre d'event**. Recenses ici pour completude : ils pilotent le consentement, les heatmaps, les A/B tests, le referrer, etc."
  );
  lines.push("");
  lines.push(
    "> **Note** : `trackAppRouter({...})` dans `modules/config/MatomoAnalytics.tsx` initialise le tracker et emet automatiquement un `trackPageView` a chaque changement de route (pages SPA Next.js). Ce n'est pas liste ci-dessous car c'est un wrapper de haut niveau."
  );
  lines.push("");
  lines.push("| commande | args | fichier:ligne |");
  lines.push("| --- | --- | --- |");
  for (const cc of configCalls) {
    const argsStr = cc.args.length > 0
      ? cc.args.map((a) => `\`${escapePipe(a)}\``).join(", ")
      : "_(aucun)_";
    lines.push(
      `| \`${escapePipe(cc.command)}\` | ${argsStr} | \`${cc.file}:${cc.line}\` |`
    );
  }
  lines.push("");
}

if (extraction.unresolved_callsites > 0) {
  lines.push("## Callsites non-resolus");
  lines.push("");
  lines.push(
    "Appels a `sendEvent` dont `extract-events.ts` n'a pas pu resoudre statiquement `category` ou `action` (ex: variable dynamique)."
  );
  lines.push("");
  lines.push("| fichier:ligne | raison |");
  lines.push("| --- | --- |");
  for (const u of extraction.unresolved) {
    lines.push(`| \`${u.file}:${u.line}\` | ${escapePipe(u.reason)} |`);
  }
  lines.push("");
}

fs.writeFileSync(OUTPUT_PATH, lines.join("\n"));
console.log(
  `[generate-events-doc] Ecrit: ${path.relative(
    path.resolve(METABASE_DIR, "..", ".."),
    OUTPUT_PATH
  )} (${documented.length} documentes, ${orphanEvents.length} orphelins, ${metadataOrphans.length} metadata orphelines)`
);
