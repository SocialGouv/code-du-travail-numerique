// Utilitaires purs (sans ts-morph) de manipulation de texte et de valeurs
// résolues. Isolés ici pour être testables sans AST.

import type { EventResolution, Resolved } from "./events.schema";

// Réduit un texte multi-ligne en une seule ligne lisible.
export function compact(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

// Provenance "la pire" d'un ensemble : dynamic > enum-param > literal. Sert à
// qualifier un event combinant plusieurs valeurs (ex: concaténation).
export function worstKind(kinds: EventResolution[]): EventResolution {
  if (kinds.includes("dynamic")) return "dynamic";
  if (kinds.includes("enum-param")) return "enum-param";
  return "literal";
}

// Déduplique une liste de valeurs résolues en gardant la première provenance
// rencontrée pour chaque valeur distincte.
export function dedupResolved(arr: Resolved[]): Resolved[] {
  const seen = new Map<string, Resolved>();
  for (const r of arr) if (!seen.has(r.value)) seen.set(r.value, r);
  return [...seen.values()];
}
