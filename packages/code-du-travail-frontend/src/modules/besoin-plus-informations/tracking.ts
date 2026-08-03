import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

export enum MatomoNeedMoreInfoEventSecondary {
  CONTACT = "contact",
}

export enum MatomoNeedMoreInfoEventTertiary {
  CLICK_PHONE_NUMBER = "click_phone_number",
  // Le parcours de contact était initialement une modale. Le libellé de
  // l'action est conservé tel quel pour ne pas rompre l'historique Matomo.
  CLICK_CONTACT_MODAL = "click_contact_sr_modale",
  SELECT_THEME = "select_theme_contact_sr",
}

export const useNeedMoreInfoEvents = () => {
  const currentPathName = usePathname();

  const emitTrackNumber = () => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.CLICK_PHONE_NUMBER,
    });
  };

  // Émis au clic sur le bouton du footer qui mène au parcours de contact.
  // `name` porte la page d'où part l'usager.
  const emitModalIsOpened = () => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.CLICK_CONTACT_MODAL,
      name: currentPathName,
    });
  };

  const emitSelectTheme = (theme: string) => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.SELECT_THEME,
      name: theme,
    });
  };

  return { emitTrackNumber, emitModalIsOpened, emitSelectTheme };
};
