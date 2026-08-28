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

  // « Afficher les informations » : les trois variantes disent quel contenu
  // l'usager obtient selon la convention choisie. La page d'où part le clic est
  // déjà dans `path` — ces émetteurs n'ont donc pas d'argument.
  const emitDisplayAgreementContent = () => {
    track("click_show_agreement_content");
  };

  const emitDisplayGenericContent = () => {
    track("click_show_content_without_agreement");
  };

  const emitDisplayGeneralContent = () => {
    track("click_show_general_content");
  };

  // Parcours de choix de convention. Le même composant de recherche est monté
  // dans les contributions, dans les simulateurs et sur la page dédiée : c'est
  // `path` (et la catégorie qui en découle) qui dit lequel, sans que l'appelant
  // ait à le transmettre.
  const emitClickP1 = () => {
    track("select_agreement_path_p1");
  };

  const emitClickP2 = () => {
    track("select_agreement_path_p2");
  };

  const emitClickP3 = () => {
    track("select_agreement_path_p3");
  };

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
  // d'abord pour le maillage interne ; l'event mesure son usage réel. `target`
  // est bien une AUTRE page que la page courante, d'où la clé.
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
