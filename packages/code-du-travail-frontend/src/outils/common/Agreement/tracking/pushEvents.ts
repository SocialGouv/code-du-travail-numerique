import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";
import { matopush } from "../../../../piwik";
import { ConventionCollective } from "../../type/WizardType";

const pushEvents = (title: string, values: ConventionCollective): void => {
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
  }
};

export default pushEvents;
