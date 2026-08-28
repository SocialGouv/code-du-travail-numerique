// Le `name` d'un event Matomo est TOUJOURS l'enveloppe JSON produite ici, jamais
// un scalaire nu.
//
// Ce n'est pas une préférence de style, c'est une correction de bug. Une analyse
// de production sur 14 jours a montré que le seau « 0 » n'existait pas dans
// Matomo : sur 13 091 `show_accords`, 10 013 (76 %) arrivaient SANS nom, et la
// chaîne "0" n'apparaissait pas une seule fois parmi les 500 noms distincts du
// site — alors que le code émettait bien `name: "0"`. La chaîne "0" est falsy en
// PHP (`empty("0") === true`) : Matomo comptait l'event et jetait le nom. Le
// « aucun accord trouvé », le seau le plus intéressant pour le métier, était
// invisible.
//
// Déplacer le compteur vers `value` ne corrigerait rien : Matomo ne conserve pas
// non plus une `value` de 0 (matomo-org/matomo#11204). L'enveloppe JSON, elle,
// est toujours une chaîne non vide — `{"count":0}` — donc toujours conservée.
// Le problème disparaît pour tous les compteurs, présents et futurs, sans cas
// particulier à retenir.

// Matomo tronque `e_n` à 500 caractères. Au-delà, on perdrait la fin du JSON et
// le nom deviendrait non parsable — pire qu'une valeur raccourcie proprement.
const MAX_EVENT_NAME_LENGTH = 500;

// Marque une valeur texte raccourcie, pour qu'un verbatim tronqué ne se lise pas
// comme un verbatim complet.
const TRUNCATION_SUFFIX = "…";

export type EventPayloadValue = string | number | boolean;

/**
 * Contexte d'un event. Toutes les clés sont optionnelles : un émetteur ne doit
 * jamais forcer un appelant à fournir une valeur qu'il n'a pas (un tag de thème
 * sans thème résolu, un résultat sans algo). Les clés `undefined` et `null` sont
 * omises à la sérialisation plutôt que rendues à `null`, pour ne pas fragmenter
 * la cardinalité des noms entre `{"theme":null}` et l'absence de clé.
 *
 * `path` est injecté automatiquement par `useTracking` : les appelants ne le
 * passent pas.
 */
export type EventPayload = {
  path?: string;
  [key: string]: EventPayloadValue | null | undefined;
};

const isOmitted = (value: unknown): boolean =>
  value === undefined || value === null;

// `path` en tête (c'est la clé qu'on lit en premier dans Matomo), le reste par
// ordre alphabétique. L'ordre doit être STABLE : deux events identiques dont les
// clés seraient sérialisées dans un ordre différent compteraient pour deux noms
// distincts dans les rapports.
const orderedEntries = (
  payload: EventPayload
): [string, EventPayloadValue][] => {
  const entries = Object.entries(payload).filter(
    (entry): entry is [string, EventPayloadValue] => !isOmitted(entry[1])
  );
  const pathEntry = entries.filter(([key]) => key === "path");
  const rest = entries
    .filter(([key]) => key !== "path")
    .sort(([a], [b]) => a.localeCompare(b));
  return [...pathEntry, ...rest];
};

// Raccourcit la plus longue valeur texte jusqu'à ce que le JSON tienne dans la
// limite Matomo. On rogne les verbatims plutôt que les identifiants : ce sont
// eux qui débordent (un commentaire d'avis va jusqu'à 500 caractères) et ce sont
// eux dont la fin importe le moins.
const fitToMatomoLimit = (
  entries: [string, EventPayloadValue][]
): [string, EventPayloadValue][] => {
  const fitted = entries.map(
    (entry) => [...entry] as [string, EventPayloadValue]
  );

  while (
    JSON.stringify(Object.fromEntries(fitted)).length > MAX_EVENT_NAME_LENGTH
  ) {
    let longestIndex = -1;
    let longestLength = 0;
    fitted.forEach(([, value], index) => {
      if (typeof value === "string" && value.length > longestLength) {
        longestIndex = index;
        longestLength = value.length;
      }
    });

    // Plus rien à rogner : on rend le JSON tel quel, Matomo le tronquera. Cas
    // théorique (il faudrait des dizaines de clés non textuelles).
    if (longestIndex === -1 || longestLength <= 1) break;

    const [key, value] = fitted[longestIndex];
    const shortened = (value as string)
      .slice(0, Math.max(1, Math.floor(longestLength * 0.8)))
      .replace(new RegExp(`${TRUNCATION_SUFFIX}$`), "");
    fitted[longestIndex] = [key, `${shortened}${TRUNCATION_SUFFIX}`];
  }

  return fitted;
};

/**
 * Sérialise le contexte d'un event en `name` Matomo.
 *
 * Renvoie toujours une chaîne non vide — `{}` au minimum — donc jamais une
 * valeur que Matomo jetterait.
 */
export const serializeEventPayload = (payload: EventPayload = {}): string =>
  JSON.stringify(Object.fromEntries(fitToMatomoLimit(orderedEntries(payload))));
