import {
  MatomoAgreementEvent,
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";
import { matopush } from "../../../../piwik";
import { ConventionCollective } from "../../type/WizardType";
import { AgreementSupportInfo } from "../types";

const pushAgreementEvents = (
  title: string,
  values: ConventionCollective | undefined,
  supportedAgreements: AgreementSupportInfo[]
): void => {
  if (!values) {
    // no agreement section, no event to send. Should never happen.
    return;
  }
  let eventName = "";
  switch (values.route) {
    case "not-selected":
      eventName = "click_p3";
      break;
    case "agreement":
      eventName = "click_p1";
      break;
    case "enterprise":
      eventName = "click_p2";
      break;
  }
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
    eventName,
    title,
  ]);
  if (values.enterprise) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
      title,
      JSON.stringify({
        label: values.enterprise.label,
        siren: values.enterprise.siren,
      }),
    ]);
  }
  if (values.selected) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
      title,
      `idcc${values.selected.num.toString()}`,
    ]);
    const idcc = values.selected.num;
    const isTreated = supportedAgreements.find(
      (agreement) => agreement.idcc === idcc
    );
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      isTreated
        ? MatomoAgreementEvent.CC_TREATED
        : MatomoAgreementEvent.CC_UNTREATED,
      idcc,
    ]);
  }
};

export default pushAgreementEvents;
