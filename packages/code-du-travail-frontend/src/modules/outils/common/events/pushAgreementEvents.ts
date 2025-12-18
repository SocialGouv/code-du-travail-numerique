import { sendEvent } from "@socialgouv/matomo-next";
import { Enterprise } from "src/modules/enterprise";
import { Agreement, AgreementRoute } from "../../indemnite-depart/types";
import {
  MatomoSearchAgreementCategory,
  MatomoBaseEvent,
  MatomoAgreementEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";

export interface ConventionCollective {
  route: AgreementRoute;
  selected?: Agreement;
  enterprise?: Enterprise;
  hasNoEnterprise?: boolean;
}

export const pushAgreementEvents = (
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

  sendEvent({
    category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
    action: parcours!,
    name: simulatorTitle,
  });

  if (values.enterprise) {
    sendEvent({
      category: MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
      action: simulatorTitle,
      name: JSON.stringify({
        label: values.enterprise.label,
        siren: values.enterprise.siren,
      }),
    });
  }
  if (values.selected && agreementSelect) {
    sendEvent({
      category: agreementSelect,
      action: simulatorTitle,
      name: `idcc${values.selected.num}`,
    });
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: isAgreementTreated
        ? MatomoAgreementEvent.CC_TREATED
        : MatomoAgreementEvent.CC_UNTREATED,
      name: values.selected.num.toString(),
    });
  }
  if (hasNoEnterpriseSelected) {
    sendEvent({
      category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      action: MatomoSimulatorEvent.SELECT_NO_COMPANY,
      name: simulatorTitle,
    });
  }
};
