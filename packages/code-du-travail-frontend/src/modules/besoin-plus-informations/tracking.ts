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
  SELECT_CHANNEL = "select_canal_contact_sr",
  SELECT_DEPARTEMENT = "select_departement_contact_sr",
  CLICK_RDV = "click_rdv_contact_sr",
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

  // Émis à la validation de l'écran « Choisir votre moyen de contact ».
  const emitSelectChannel = (channel: string) => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.SELECT_CHANNEL,
      name: channel,
    });
  };

  // Émis à chaque sélection d'un département à l'écran « Prendre rendez-vous ».
  const emitSelectDepartement = (departement: string) => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.SELECT_DEPARTEMENT,
      name: departement,
    });
  };

  // Émis au clic sur le lien sortant vers la page de prise de rendez-vous.
  const emitClickRdv = (departement: string) => {
    sendEvent({
      category: MatomoNeedMoreInfoEventSecondary.CONTACT,
      action: MatomoNeedMoreInfoEventTertiary.CLICK_RDV,
      name: departement,
    });
  };

  return {
    emitTrackNumber,
    emitModalIsOpened,
    emitSelectTheme,
    emitSelectChannel,
    emitSelectDepartement,
    emitClickRdv,
  };
};
