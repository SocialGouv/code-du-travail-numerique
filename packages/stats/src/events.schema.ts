// Types partagés du pipeline d'extraction des events Matomo.
//
// `extract-events.ts` produit un `EventsExtraction`, `check-events.ts` le
// compare au fichier `events/events.extracted.json` committé.

// Comment la category/action d'un event a été résolue depuis le code :
// - "literal"    : valeur littérale (string ou membre d'enum directement écrit)
// - "enum-param" : valeur déduite d'un paramètre typé enum (ex: action: MatomoHomeEvent)
//                  → une ligne par valeur possible de l'enum.
// - "dynamic"    : valeur calculée à runtime (variable string, template, JSON...)
//                  → représentée par un placeholder <...>.
export type EventResolution = "literal" | "enum-param" | "dynamic";

// Valeur résolue d'un champ category/action/name, avec sa provenance. Type
// interne au pipeline d'extraction (n'apparaît pas dans le JSON de sortie).
export type Resolved = { value: string; kind: EventResolution };

// Un event Matomo (une combinaison category/action concrète). Un même appel
// sendEvent peut produire plusieurs events si category ou action est un enum.
export type ExtractedEvent = {
  category: string;
  action: string;
  // Pattern du `name` passé à l'event. `null` si absent. Peut être un
  // placeholder `<expr>` quand la valeur est calculée à runtime.
  name_pattern: string | null;
  resolution: EventResolution;
  // Nom de la fonction englobante (utile pour retrouver l'émetteur).
  emit_function: string | null;
  // Chemin du fichier, relatif à la racine du repo, + ligne de l'appel.
  file: string;
  line: number;
  // Références d'enums utilisées dans l'objet event (ex: "MatomoBaseEvent.OUTIL").
  enum_refs: string[];
  // "sendEvent" pour sendEvent({...}) ; "push:<command>" pour push([cmd, ...]).
  tracking_method: string;
};

// Commande Matomo de configuration (non-event) repérée dans un push([cmd, ...]).
// Ex: setReferrerUrl, AbTesting::create, optUserOut, HeatmapSessionRecording.
export type MatomoConfigCall = {
  command: string;
  args: string[];
  file: string;
  line: number;
};

// Tracking automatique installé via la lib (ex: trackAppRouter de matomo-next),
// qui émet pageview / site search / outlink / A-B en interne, hors sendEvent.
export type FrameworkAutoTracking = {
  installer: string;
  auto_events: string[];
  file: string;
  line: number;
};

// Tracking NON-Matomo détecté dans le code (ex: conversion Google gtag / SEA).
export type OtherTracking = {
  system: string;
  event: string;
  detail: string;
  file: string;
  line: number;
};

// Appel à sendEvent dont category/action n'ont pas pu être résolus.
export type UnresolvedCall = {
  file: string;
  line: number;
  reason: string;
};

// Sortie complète de l'extraction. Volontairement SANS timestamp pour rester
// déterministe : le drift check compare ce JSON par égalité stricte.
export type EventsExtraction = {
  scan_root: string;
  callsites: number; // nb d'appels physiques sendEvent / push event
  total_events: number; // nb de lignes events (après expansion des enums)
  unique_events: number; // nb de couples category:action distincts
  unresolved_callsites: number;
  events: ExtractedEvent[];
  unresolved: UnresolvedCall[];
  matomo_config_calls: MatomoConfigCall[];
  framework_auto_tracking: FrameworkAutoTracking[];
  other_tracking: OtherTracking[];
};

export const EVENT_KEY = (e: { category: string; action: string }): string =>
  `${e.category}:${e.action}`;
