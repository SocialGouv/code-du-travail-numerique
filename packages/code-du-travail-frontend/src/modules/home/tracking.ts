import { sendEvent } from "../utils";

enum MatomoHomeCategory {
  PAGE_HOME = "page_home",
}

export enum MatomoHomeEvent {
  CLICK_VOIR_TOUS_LES_OUTILS = "click_voir_tous_les_outils",
  CLICK_VOIR_TOUS_LES_MODELES = "Click_voir_tous_modeles_de_documents",
  CLICK_VOIR_TOUTES_LES_FICHES = "click_voir_toutes_les_fiches_pratiques",
  CLICK_VOIR_TOUTES_LES_CONVENTIONS_COLLECTIVES = "click_voir_toutes_les_conventions_collectives",
  CLICK_VOIR_TOUTES_LES_THEMES = "click_voir_tous_les_themes",
}

export const useHomeTracking = () => {
  const emitHomeClickButtonEvent = (action: MatomoHomeEvent) => {
    sendEvent({
      category: MatomoHomeCategory.PAGE_HOME,
      action,
    });
  };

  return {
    emitHomeClickButtonEvent,
  };
};
