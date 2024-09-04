import {
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
  let parcours: MatomoSearchAgreementCategory | undefined = undefined;
  let agreementSelect: MatomoSearchAgreementCategory | undefined = undefined;
  switch (values.route) {
    case "agreement":
      parcours = MatomoSearchAgreementCategory.PARCOURS_1;
      agreementSelect = MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1;
      break;
    case "enterprise":
      parcours = MatomoSearchAgreementCategory.PARCOURS_2;
      agreementSelect = MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2;
      break;
    case "not-selected":
      parcours = MatomoSearchAgreementCategory.PARCOURS_3;
      break;
  }
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
    parcours,
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
  if (
    values.selected &&
    agreementSelect &&
    values.selected.num &&
    values.selected.num !== 9999
  ) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      agreementSelect,
      simulatorTitle,
      `idcc${values.selected.num}`,
    ]);
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      isAgreementTreated
        ? MatomoAgreementEvent.CC_TREATED
        : MatomoAgreementEvent.CC_UNTREATED,
      values.selected.num,
    ]);
  }
  if (hasNoEnterpriseSelected) {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      MatomoSimulatorEvent.SELECT_NO_COMPANY,
      simulatorTitle,
    ]);
  }
};

export default pushAgreementEvents;
