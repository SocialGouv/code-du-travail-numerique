import { Enterprise } from "src/modules/enterprise";
import { sendPageEvent } from "src/modules/analytics/events";
import { Agreement, AgreementRoute } from "../../indemnite-depart/types";

export interface ConventionCollective {
  route: AgreementRoute;
  selected?: Agreement;
  enterprise?: Enterprise;
  hasNoEnterprise?: boolean;
}

// Émis depuis les stores zustand des simulateurs, hors de tout rendu React :
// d'où `sendPageEvent` (non-hook) plutôt que `useTracking`.
//
// Chaque event garde un émetteur dédié dont l'action est un littéral, branche
// par branche, pour rester extractible statiquement (cf. @socialgouv/cdtn-stats).
// Faire passer l'action par une variable runtime la rendrait invisible d'un scan
// AST et ferait remonter le call site en `unresolved`.

// Parcours suivi par l'usager pour renseigner sa convention.
const emitParcoursTypeEvent = (
  route: AgreementRoute,
  simulator: string
): void => {
  switch (route) {
    case "agreement":
      sendPageEvent("select_agreement_path_p1", { context: simulator });
      break;
    case "enterprise":
      sendPageEvent("select_agreement_path_p2", { context: simulator });
      break;
    case "not-selected":
      sendPageEvent("select_agreement_path_p3", { context: simulator });
      break;
  }
};

const emitEnterpriseSelectEvent = (
  simulator: string,
  enterprise: Enterprise
): void => {
  sendPageEvent("select_enterprise", {
    context: simulator,
    label: enterprise.label,
    siren: enterprise.siren,
  });
};

// Sélection effective de la convention. Le parcours "not-selected" n'en émet pas.
const emitAgreementSelectEvent = (
  route: AgreementRoute,
  simulator: string,
  agreementNum: number
): void => {
  switch (route) {
    case "agreement":
      sendPageEvent("select_agreement_p1", {
        context: simulator,
        idcc: agreementNum,
      });
      break;
    case "enterprise":
      sendPageEvent("select_agreement_p2", {
        context: simulator,
        idcc: agreementNum,
      });
      break;
    case "not-selected":
      break;
  }
};

// La convention retenue est-elle prise en charge par le simulateur (calcul ou
// contenu dédié disponible) ? Sert à prioriser les CC à traiter.
const emitAgreementTreatedEvent = (
  isAgreementTreated: boolean,
  simulator: string,
  agreementNum: number
): void => {
  if (isAgreementTreated) {
    sendPageEvent("select_agreement_supported", {
      context: simulator,
      idcc: agreementNum,
    });
  } else {
    sendPageEvent("select_agreement_unsupported", {
      context: simulator,
      idcc: agreementNum,
    });
  }
};

// « Je n'ai pas d'entreprise » : particulier employeur, assistant maternel.
const emitNoEnterpriseSelectEvent = (simulator: string): void => {
  sendPageEvent("select_no_enterprise", { context: simulator });
};

// Seuls les parcours "agreement" (p1) et "enterprise" (p2) émettent un event de
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
    emitAgreementTreatedEvent(
      isAgreementTreated,
      simulatorTitle,
      values.selected.num
    );
  }
  if (hasNoEnterpriseSelected) {
    emitNoEnterpriseSelectEvent(simulatorTitle);
  }
};
