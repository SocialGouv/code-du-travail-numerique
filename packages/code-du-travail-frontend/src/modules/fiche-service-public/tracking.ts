import { sendEvent } from "@socialgouv/matomo-next";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { toEventName } from "../analytics/eventName";

// Même valeur que la catégorie de `clic_tag_theme` sur ces pages (source tirée
// du pathname) : tous les events d'une fiche service-public se lisent ensemble.
export enum TrackingFicheSPCategory {
  FICHE_SP = "fiche-service-public",
}

export enum TrackingFicheSPAction {
  CLICK_RECOMMENDED_LINK = "clic_lien_recommande",
  RECOMMENDED_LINKS_VIEWED = "liens_recommandes_affiches",
}

const toFicheEventName = (slug: string) =>
  `${getRouteBySource(SOURCES.SHEET_SP)}/${slug}`;

export const useFicheSPTracking = () => {
  // Clic sur une carte de la rubrique « Liens recommandés » (#7539). `name`
  // reprend la forme de `clic_explorez_thematique` : `slug` = la fiche de
  // départ (même forme que `liens_recommandes_affiches`, pour se joindre),
  // `cible` = le contenu atteint (`themes/<parent>#<sous-theme>` pour un
  // sous-thème, `contribution/<slug>`… pour un document) et `position` (1 = la
  // première carte, le sous-thème de rattachement de la fiche quand il existe).
  const emitClickRecommendedLink = (
    ficheSlug: string,
    href: string,
    position: number
  ) => {
    sendEvent({
      category: TrackingFicheSPCategory.FICHE_SP,
      action: TrackingFicheSPAction.CLICK_RECOMMENDED_LINK,
      name: JSON.stringify({
        slug: toFicheEventName(ficheSlug),
        cible: toEventName(href),
        position,
      }),
    });
  };

  // Émis une fois par page dès que la rubrique entre dans l'écran, sans temps
  // de présence : c'est le dénominateur de `clic_lien_recommande`.
  const emitRecommendedLinksViewed = (ficheSlug: string) => {
    sendEvent({
      category: TrackingFicheSPCategory.FICHE_SP,
      action: TrackingFicheSPAction.RECOMMENDED_LINKS_VIEWED,
      name: toFicheEventName(ficheSlug),
    });
  };

  return {
    emitClickRecommendedLink,
    emitRecommendedLinksViewed,
  };
};
