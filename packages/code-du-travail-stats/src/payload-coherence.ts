// Cohérence du vocabulaire des payloads.
//
// Le drift-check vérifie que le catalogue est À JOUR avec le code. Ce module
// vérifie qu'il est COHÉRENT : deux émetteurs de la même action doivent envoyer
// le même contexte. Sans ça, la même action porte `{path, idcc}` ici et
// `{path, context, idcc}` là, et personne ne s'en aperçoit avant d'écrire un
// segment Matomo qui ne remonte que la moitié des cas.
//
// C'est exactement le genre de dérive que la refonte a éliminée à la main une
// fois ; ce contrôle évite d'avoir à recommencer.

import type { ExtractedEvent } from "./events.schema";

// Clés légitimement absentes selon le contexte d'émission. Toute autre
// divergence est un bug de cohérence.
//
// `select_result` est émis par la recherche (qui connaît l'algorithme de
// classement ayant produit le résultat) et par les pages thème (où les liens
// sont éditorialisés, sans algorithme) : `algo` n'a pas d'équivalent là-bas.
const OPTIONAL_KEYS: Readonly<Record<string, readonly string[]>> = {
  select_result: ["algo"],
};

export type CoherenceIssue = {
  action: string;
  shapes: string[];
  unexpectedKeys: string[];
};

const keysOf = (namePattern: string | null): string[] => {
  const match = /^\{(.*)\}$/.exec(namePattern ?? "");
  if (!match) return [];
  return match[1] ? match[1].split(", ") : [];
};

/**
 * Repère les actions dont les émetteurs ne s'accordent pas sur le contexte.
 *
 * On ne compare que les events du socle normalisé (ceux dont la forme est un
 * `{…}`) : la recherche interne native de Matomo et le relai de notation ont
 * des formes calculées au runtime, hors de ce contrat.
 */
export function findPayloadIncoherences(
  events: ExtractedEvent[]
): CoherenceIssue[] {
  const shapesByAction = new Map<string, Set<string>>();

  for (const event of events) {
    if (!event.name_pattern?.startsWith("{")) continue;
    const shapes = shapesByAction.get(event.action) ?? new Set<string>();
    shapes.add(event.name_pattern);
    shapesByAction.set(event.action, shapes);
  }

  const issues: CoherenceIssue[] = [];

  for (const [action, shapes] of shapesByAction) {
    if (shapes.size === 1) continue;

    const keySets = [...shapes].map((shape) => new Set(keysOf(shape)));
    const union = new Set(keySets.flatMap((set) => [...set]));
    const diverging = [...union].filter((key) =>
      keySets.some((set) => !set.has(key))
    );

    const allowed = OPTIONAL_KEYS[action] ?? [];
    const unexpectedKeys = diverging.filter((key) => !allowed.includes(key));

    if (unexpectedKeys.length > 0) {
      issues.push({ action, shapes: [...shapes].sort(), unexpectedKeys });
    }
  }

  return issues.sort((a, b) => a.action.localeCompare(b.action));
}
