import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

export enum MatomoNeedMoreInfoEventSecondary {
  CONTACT = "contact",
}

export enum MatomoNeedMoreInfoEventTertiary {
  CLICK_PHONE_NUMBER = "click_phone_number",
  CLICK_CONTACT_MODAL = "click_contact_sr_modale",
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

  return { emitTrackNumber, emitModalIsOpened };
};
