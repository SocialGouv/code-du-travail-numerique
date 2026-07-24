import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

export enum MatomoNeedMoreInfoEventSecondary {
  CONTACT = "contact",
}

export enum MatomoNeedMoreInfoEventTertiary {
  CLICK_PHONE_NUMBER = "click_phone_number",
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
