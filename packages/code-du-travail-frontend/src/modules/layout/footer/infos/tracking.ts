import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../../../../lib";
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
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoNeedMoreInfoEventSecondary.CONTACT,
      MatomoNeedMoreInfoEventTertiary.CLICK_PHONE_NUMBER,
    ]);
  };

  const emitModalIsOpened = () => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoNeedMoreInfoEventSecondary.CONTACT,
      MatomoNeedMoreInfoEventTertiary.CLICK_CONTACT_MODAL,
      currentPathName,
    ]);
  };

  return { emitTrackNumber, emitModalIsOpened };
};
