import { useTracking } from "../analytics/events/useTracking";
import { toEventName } from "../analytics/eventName";

export const useContributionTracking = () => {
  const { track } = useTracking();

  // La convention choisie est-elle prise en charge par la contribution (contenu
  // dédié disponible) ? Sert à prioriser les CC à traiter.
  const emitAgreementTreatedEvent = (idcc: number) => {
    track("select_agreement_supported", { idcc });
  };

  const emitAgreementUntreatedEvent = (idcc: number) => {
    track("select_agreement_unsupported", { idcc });
  };

  // « Afficher les informations » : `target` = la page ATTEINTE, le `path`
  // injecté portant déjà la page de départ.
  const emitDisplayAgreementContent = (target: string) => {
    track("click_show_agreement_content", { target: toEventName(target) });
  };

  const emitDisplayGenericContent = (target: string) => {
    track("click_show_content_without_agreement", {
      target: toEventName(target),
    });
  };

  const emitDisplayGeneralContent = (target: string) => {
    track("click_show_general_content", { target: toEventName(target) });
  };

  // Parcours de choix de convention. `context` identifie l'endroit d'où part le
  // parcours — une contribution ou un simulateur : le même composant de
  // recherche de CC est monté dans les deux.
  const emitClickP1 = (context: string) => {
    track("select_agreement_path_p1", { context: toEventName(context) });
  };

  const emitClickP2 = (context: string) => {
    track("select_agreement_path_p2", { context: toEventName(context) });
  };

  const emitClickP3 = (context: string) => {
    track("select_agreement_path_p3", { context: toEventName(context) });
  };

  // Le slug de la contribution n'a plus besoin d'être passé : ces deux events se
  // produisent sur la page de la contribution elle-même, donc dans le `path`.
  const emitClickTableFullscreen = () => {
    track("click_table_fullscreen");
  };

  // Réponse RÉELLEMENT consultée : le titre du bloc réponse est entré dans le
  // haut de l'écran et y est resté ~10 s, onglet actif. Émis une seule fois par
  // page. Indicateur clé sur les arrivées directes via une convention.
  const emitContentViewed = () => {
    track("view_answer");
  };

  // Clic sur une convention listée dans l'accordéon « Votre réponse en fonction
  // de votre convention collective » de la fiche générique. Ce bloc existe
  // d'abord pour le maillage interne ; l'event mesure son usage réel.
  const emitClickAgreementDeclination = (href: string) => {
    track("click_agreement_declination", { target: toEventName(href) });
  };

  return {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGenericContent,
    emitDisplayGeneralContent,
    emitClickP1,
    emitClickP2,
    emitClickP3,
    emitClickTableFullscreen,
    emitContentViewed,
    emitClickAgreementDeclination,
  };
};
