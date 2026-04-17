// Types partages pour le pipeline d'events Matomo.
// - ExtractedEvent : ground truth issue de l'AST des tracking.ts (auto)
// - EventMetadata  : description metier maintenue a la main dans events.metadata.yaml
// - MergedEvent    : jointure des deux, consommee par generate-events-doc.ts

export type ExtractedEvent = {
  category: string;
  action: string;
  name_pattern: string | null;
  emit_function: string | null;
  file: string;
  line: number;
  enum_refs: string[];
  // "sendEvent" : appel a sendEvent({ category, action, name }) de @socialgouv/matomo-next
  // "push:<command>" : appel a push([command, ...args]) ou _paq.push([command, ...args])
  //                    ou paq.push([command, ...args])
  tracking_method: string;
};

// Commande Matomo de configuration (non-event) detectee dans un push([cmd, ...]).
// Exemples : setReferrerUrl, setCookieSameSite, AbTesting::create, optUserOut,
// HeatmapSessionRecording::enable, etc.
export type MatomoConfigCall = {
  command: string;
  args: string[];
  file: string;
  line: number;
};

export type EventMetadata = {
  label_fr: string;
  trigger: string;
  kpi?: string;
  dashboards?: number[];
  cards?: number[];
  mv_source?: string;
  feature_group: string;
  since?: string;
  deprecated?: boolean;
  notes?: string;
};

export type MergedEvent = ExtractedEvent & {
  metadata: EventMetadata | null;
};

export type EventsExtraction = {
  generated_at: string;
  scan_root: string;
  total_callsites: number;
  unique_events: number;
  events: ExtractedEvent[];
  matomo_config_calls?: MatomoConfigCall[];
};

export const EVENT_KEY = (e: { category: string; action: string }) =>
  `${e.category}:${e.action}`;
