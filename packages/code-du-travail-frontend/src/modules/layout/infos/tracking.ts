import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../../../lib";

export enum MatomoNeedMoreInfoEventSecondary {
  CONTACT = "contact",
}

export enum MatomoNeedMoreInfoEventTertiary {
  CLICK_PHONE_NUMBER = "click_phone_number",
  CLICK_CONTACT_MODAL = "click_contact_sr_modale",
}

export const useNeedMoreInfoEvents = () => {
  const emitTrackNumber = () => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoNeedMoreInfoEventSecondary.CONTACT,
      MatomoNeedMoreInfoEventTertiary.CLICK_PHONE_NUMBER,
    ]);
  };

  const emitModalIsOpened = (baseUrl: string) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoNeedMoreInfoEventSecondary.CONTACT,
      MatomoNeedMoreInfoEventTertiary.CLICK_CONTACT_MODAL,
      baseUrl,
    ]);
  };

  return { emitTrackNumber, emitModalIsOpened };
};
