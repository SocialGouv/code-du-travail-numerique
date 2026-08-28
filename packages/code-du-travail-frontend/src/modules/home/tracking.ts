import { useTracking } from "../analytics/events/useTracking";

// Cibles des boutons « voir tout » de la page d'accueil. L'ancien schéma avait
// une action Matomo par bouton (`click_voir_tous_les_outils`, `Click_voir_tous_
// modeles_de_documents`…, avec une majuscule aberrante sur l'un d'eux). Ces
// huit variantes désignent la même interaction — un raccourci de l'accueil vers
// une rubrique — et deviennent donc un `target` de payload : la cible est une
// énumération bornée, elle reste lisible dans la sous-table des noms.
export enum HomeShortcutTarget {
  OUTILS = "outils",
  MODELES_DE_COURRIERS = "modeles-de-courriers",
  CONTRIBUTIONS = "contribution",
  CONVENTIONS_COLLECTIVES = "convention-collective",
  THEMES = "themes",
  ACTUALITES = "actualite",
  DROIT_DU_TRAVAIL = "droit-du-travail",
}

export const useHomeTracking = () => {
  const { track } = useTracking();

  const emitHomeClickButtonEvent = (target: HomeShortcutTarget) => {
    track("click_shortcut", { target });
  };

  // Section « De la question à l'action » : `target` = slug de la ressource
  // visée.
  const emitQuestionActionEvent = (slug: string) => {
    track("click_guided_question", { target: slug });
  };

  return {
    emitHomeClickButtonEvent,
    emitQuestionActionEvent,
  };
};
