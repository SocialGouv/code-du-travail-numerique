import { useTracking } from "../analytics/events/useTracking";

export const useNeedMoreInfoEvents = () => {
  const { track } = useTracking();

  const emitTrackNumber = () => {
    track("click_phone_number");
  };

  // Clic sur le bouton du footer qui mène au parcours de contact. Le `path`
  // injecté porte la page d'origine — l'ancien émetteur devait le passer à la
  // main via `usePathname`.
  //
  // L'action historique s'appelait `click_contact_sr_modale` : le parcours était
  // une modale, il est devenu une page. Le libellé était conservé pour ne pas
  // rompre l'historique Matomo ; la bascule le rompt de toute façon, c'est donc
  // le moment de le corriger.
  const emitModalIsOpened = () => {
    track("click_contact_form");
  };

  const emitSelectTheme = (theme: string) => {
    track("select_contact_theme", { theme });
  };

  return { emitTrackNumber, emitModalIsOpened, emitSelectTheme };
};
