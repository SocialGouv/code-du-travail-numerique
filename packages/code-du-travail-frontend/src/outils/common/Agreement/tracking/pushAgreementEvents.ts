import {
  MatomoActionEvent,
  MatomoAgreementEvent,
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
  MatomoSimulatorEvent,
} from "../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { ConventionCollective } from "../../type/WizardType";

const pushAgreementEvents = (
  simulatorTitle: string,
  values: ConventionCollective | undefined,
  isAgreementTreated: boolean,
  hasNoEnterpriseSelected: boolean
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
    simulatorTitle,
  ]);
  if (values.enterprise) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
      simulatorTitle,
      JSON.stringify({
        label: values.enterprise.label,
        siren: values.enterprise.siren,
      }),
    ]);
  }
  if (values.selected) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      values.route === "agreement"
        ? MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1
        : MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
      simulatorTitle,
      `idcc${values.selected.num?.toString()}`,
    ]);
    const idcc = values.selected.num;
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      isAgreementTreated
        ? MatomoAgreementEvent.CC_TREATED
        : MatomoAgreementEvent.CC_UNTREATED,
      idcc,
    ]);
  }
  if (hasNoEnterpriseSelected) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      MatomoSimulatorEvent.SELECT_JE_N_AI_PAS_D_ENTREPRISE,
      simulatorTitle,
    ]);
  }
};

export default pushAgreementEvents;
