// Source de vérité partagée du widget NPS (Net Promoter Score, note 0-10).
// Ce fichier ne dépend NI de React NI du DOM : il est importé à la fois côté
// client (widget, modale, tracking) et côté serveur (controller/service qui
// bornent la note et valident event/trigger contre ces allowlists).

export const NPS_MIN = 0;
export const NPS_MAX = 10;

// Échelle 0..10 (11 boutons).
export const NPS_SCALE: number[] = Array.from(
  { length: NPS_MAX - NPS_MIN + 1 },
  (_, i) => NPS_MIN + i
);

// Contenu (cf. spec / maquette Figma).
export const NPS_INTRO = "Donnez votre avis !";
export const NPS_QUESTION =
  "Recommanderiez-vous le code du travail numérique à un proche ?";
export const NPS_LABEL_MIN = "Pas du tout";
export const NPS_LABEL_MAX = "Absolument";
export const NPS_SUBMIT_LABEL = "Valider";
// Libellé de l'icône « main » flottante (bouton d'ouverture volontaire).
export const NPS_HAND_LABEL = "Donnez votre avis";

// Persistance anti-resollicitation.
// Cookie posé à la validation → plus de sollicitation pendant 2 semaines.
export const NPS_COOKIE_NAME = "cdtn-nps-answered";
export const NPS_COOKIE_MAX_AGE_DAYS = 14;
// Flag de session : les déclencheurs automatiques ne s'arment qu'une fois par
// session (que l'usager ait répondu ou non).
export const NPS_SESSION_KEY = "cdtn-nps-shown";
// Flag persistant : la « main » a été fermée sans notation → elle disparaît
// définitivement (localStorage, pas de date d'expiration).
export const NPS_HAND_DISMISSED_KEY = "cdtn-nps-hand-dismissed";

// Déclencheur ayant provoqué l'affichage → relayé dans l'action Matomo.
export enum NpsTrigger {
  EXIT_INTENT = "exit_intent",
  DOWNLOAD = "download",
  COPY = "copy",
  // Clic volontaire sur l'icône « main » (présente sur toutes les pages).
  MAIN = "main",
}

// Type d'event → relayé dans la catégorie Matomo (les champs action/name/value
// étant déjà alloués au trigger, au chemin de page et à la note).
export enum NpsEvent {
  DISPLAYED = "nps_popin_displayed",
  REFUSAL = "nps_popin_refusal",
  SUBMITTED = "nps_submitted",
}
