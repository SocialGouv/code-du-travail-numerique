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

// Chaque event est émis via un émetteur dédié dont la category/action sont des
// littéraux (membres d'enum), branche par branche. Objectif : rendre les events
// extractibles statiquement (cf. @socialgouv/cdtn-stats) — auparavant l'action
// du parcours et la catégorie de sélection passaient par des variables runtime
// (`parcours!`, `agreementSelect`), invisibles pour un scan AST ou un grep.

// Event "type d'utilisateur" : click_p1 / click_p2 / click_p3 selon le parcours.
const emitParcoursTypeEvent = (
  route: AgreementRoute,
  simulatorTitle: string
): void => {
  switch (route) {
    case "agreement":
      sendEvent({
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: MatomoSearchAgreementCategory.PARCOURS_1,
        name: simulatorTitle,
      });
      break;
    case "enterprise":
      sendEvent({
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: MatomoSearchAgreementCategory.PARCOURS_2,
        name: simulatorTitle,
      });
      break;
    case "not-selected":
      sendEvent({
        category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        action: MatomoSearchAgreementCategory.PARCOURS_3,
        name: simulatorTitle,
      });
      break;
  }
};

const emitEnterpriseSelectEvent = (
  simulatorTitle: string,
  enterprise: Enterprise
): void => {
  sendEvent({
    category: MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
    action: simulatorTitle,
    name: JSON.stringify({
      label: enterprise.label,
      siren: enterprise.siren,
    }),
  });
};

// Event de sélection de la convention : cc_select_p1 (parcours par nom de CC)
// ou cc_select_p2 (parcours par entreprise). Pas d'event pour "not-selected".
const emitAgreementSelectEvent = (
  route: AgreementRoute,
  simulatorTitle: string,
  agreementNum: number
): void => {
  switch (route) {
    case "agreement":
      sendEvent({
        category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
        action: simulatorTitle,
        name: `idcc${agreementNum}`,
      });
      break;
    case "enterprise":
      sendEvent({
        category: MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        action: simulatorTitle,
        name: `idcc${agreementNum}`,
      });
      break;
    case "not-selected":
      break;
  }
};

const emitAgreementTreatedEvent = (
  isAgreementTreated: boolean,
  agreementNum: number
): void => {
  if (isAgreementTreated) {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoAgreementEvent.CC_TREATED,
      name: agreementNum.toString(),
    });
  } else {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoAgreementEvent.CC_UNTREATED,
      name: agreementNum.toString(),
    });
  }
};

const emitNoEnterpriseSelectEvent = (simulatorTitle: string): void => {
  sendEvent({
    category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
    action: MatomoSimulatorEvent.SELECT_NO_COMPANY,
    name: simulatorTitle,
  });
};

// Seuls les parcours "agreement" (P1) et "enterprise" (P2) émettent un event de
// sélection de convention. "not-selected" n'en a pas.
const hasAgreementSelectParcours = (route: AgreementRoute): boolean =>
  route === "agreement" || route === "enterprise";

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

  emitParcoursTypeEvent(values.route, simulatorTitle);

  if (values.enterprise) {
    emitEnterpriseSelectEvent(simulatorTitle, values.enterprise);
  }
  if (values.selected && hasAgreementSelectParcours(values.route)) {
    emitAgreementSelectEvent(values.route, simulatorTitle, values.selected.num);
    emitAgreementTreatedEvent(isAgreementTreated, values.selected.num);
  }
  if (hasNoEnterpriseSelected) {
    emitNoEnterpriseSelectEvent(simulatorTitle);
  }
};
