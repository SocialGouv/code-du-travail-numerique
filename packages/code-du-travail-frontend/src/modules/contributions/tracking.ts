import { sendEvent } from "@socialgouv/matomo-next";
import { MatomoAgreementEvent } from "../analytics";
import { toPageEventName } from "../analytics/eventName";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

export enum TrackingContributionCategory {
  TOOL = "outil",
  CONTRIBUTION = "contribution",
  CC_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
  // Catégorie isolée pour le funnel de choix de convention collective des
  // contributions : un rapport Matomo = un funnel, sans mélanger ces étapes
  // avec `cc_search_type_of_users` (partagé avec les simulateurs et la page
  // « Trouver sa convention collective ») ni avec `contribution`.
  CC_SEARCH_FUNNEL = "cc_search_funnel",
}

export enum TrackingAgreementSearchAction {
  CLICK_DISPLAY_AGREEMENT_CONTENT = "click_afficher_les_informations_CC",
  CLICK_DISPLAY_GENERIC_CONTENT = "click_afficher_les_informations_sans_CC",
  CLICK_DISPLAY_GENERAL_CONTENT = "click_afficher_les_informations_générales",
  CLICK_P1 = "click_p1",
  CLICK_P2 = "click_p2",
  CLICK_P3 = "click_p3",
}

export enum TrackingContributionAction {
  BTN_TABLE_FULLSCREEN = "btn_table_fullscreen",
  CONTENT_VIEWED = "reponse_consultee",
  CLICK_AGREEMENT_DECLINATION = "clic_declinaison_cc",
}

// Funnel « choix de la convention collective » d'une contribution, de
// l'affichage du bloc jusqu'au clic sur « Afficher les informations » — y
// compris les décrochages (recherches infructueuses, retours arrière, clics de
// bouton bloqués) qu'aucun event ne captait jusqu'ici.
//
// `click_p1` / `click_p2` / `click_p3` (catégorie `cc_search_type_of_users`)
// restent inchangés : ils partent à la sélection effective d'une CC, alors que
// `select_p1` / `select_p2` / `select_p3` ci-dessous partent au clic sur la
// radio. Les deux séries coexistent pour ne pas casser les courbes existantes.
export enum TrackingCcFunnelAction {
  VIEW_BLOC_CC = "view_bloc_cc",
  CLICK_WHAT_IS_AGREEMENT = "click_c_est_quoi_une_cc",
  SELECT_P1 = "select_p1",
  SELECT_P2 = "select_p2",
  SELECT_P3 = "select_p3",
  START_AGREEMENT_SEARCH = "start_recherche_cc",
  NO_RESULT_AGREEMENT = "no_result_cc",
  START_ENTERPRISE_SEARCH = "start_recherche_entreprise",
  SUBMIT_ENTERPRISE_SEARCH = "submit_recherche_entreprise",
  SELECT_LOCATION = "select_localisation",
  NO_RESULT_ENTERPRISE = "no_result_entreprise",
  ERROR_ENTERPRISE_SEARCH = "error_recherche_entreprise",
  SELECT_ENTERPRISE = "select_entreprise",
  ENTERPRISE_WITHOUT_AGREEMENT = "entreprise_sans_cc",
  SELECT_ENTERPRISE_AGREEMENT = "select_cc_entreprise",
  SELECT_HOUSEHOLD_EMPLOYER = "select_particulier_employeur",
  CLICK_MODIFY_ENTERPRISE = "click_modifier_entreprise",
  CLICK_MODIFY_AGREEMENT = "click_modifier_cc",
  CLICK_DISPLAY_INFORMATION = "click_afficher_les_informations",
  BLOCKED_WITHOUT_ROUTE = "blocked_sans_option",
  BLOCKED_WITHOUT_AGREEMENT_P1 = "blocked_sans_cc_p1",
  BLOCKED_WITHOUT_AGREEMENT_P2 = "blocked_sans_cc_p2",
  UNTREATED_AGREEMENT_RETAINED = "cc_non_traitee_retenue",
  CLICK_EXTERNAL_AGREEMENT_LINK = "click_lien_cc_externe",
}

export const useContributionTracking = () => {
  const emitAgreementTreatedEvent = (idcc: number) => {
    sendEvent({
      category: TrackingContributionCategory.TOOL,
      action: MatomoAgreementEvent.CC_TREATED,
      name: idcc.toString(),
    });
  };

  const emitAgreementUntreatedEvent = (idcc: number) => {
    sendEvent({
      category: TrackingContributionCategory.TOOL,
      action: MatomoAgreementEvent.CC_UNTREATED,
      name: idcc.toString(),
    });
  };

  const emitDisplayAgreementContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_AGREEMENT_CONTENT,
      name: path,
    });
  };

  const emitDisplayGenericContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_GENERIC_CONTENT,
      name: path,
    });
  };

  const emitDisplayGeneralContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_GENERAL_CONTENT,
      name: path,
    });
  };

  const emitClickP1 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P1,
      name: path,
    });
  };

  const emitClickP2 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P2,
      name: path,
    });
  };

  const emitClickP3 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P3,
      name: path,
    });
  };

  const emitClickTableFullscreen = (slug: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingContributionAction.BTN_TABLE_FULLSCREEN,
      name: `${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`,
    });
  };

  // Émis une fois par page quand l'utilisateur a réellement consulté le bloc
  // réponse (titre entré dans le haut de l'écran + ~10 s de présence, onglet
  // actif). Sert d'indicateur « la réponse a bien été vue » notamment sur les
  // arrivées directes via une convention collective.
  const emitContentViewed = (slug: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingContributionAction.CONTENT_VIEWED,
      name: `${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`,
    });
  };

  // Clic sur un lien de l'accordéon « Votre réponse en fonction de votre
  // convention collective » (fiche générique). `name` = chemin de la page CC
  // atteinte, sous la même forme que les events ci-dessus qui le construisent
  // depuis `getRouteBySource` (`contribution/44-mon-slug`).
  const emitClickAgreementDeclination = (href: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingContributionAction.CLICK_AGREEMENT_DECLINATION,
      name: toPageEventName(href),
    });
  };

  return {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGenericContent,
    emitDisplayGeneralContent,
    emitClickP1,
    emitClickP2,
    emitClickP3,
    emitClickTableFullscreen,
    emitContentViewed,
    emitClickAgreementDeclination,
  };
};

// ---------------------------------------------------------------------------
// Funnel de choix de la convention collective (contributions)
// ---------------------------------------------------------------------------
//
// Un émetteur par action, avec `category` et `action` écrits en littéraux
// d'enum : l'extracteur AST de @socialgouv/cdtn-stats les classerait sinon
// `dynamic`/`unresolved` et la CI `stats-events` échouerait (même contrainte
// que dans `src/modules/outils/common/events/pushAgreementEvents.ts`). D'où la
// répétition assumée : surtout pas d'émetteur générique paramétré.
//
// `name` = chemin de la page contribution (`contribution/<slug>` côté
// générique, chemin de la fiche CC côté personnalisé), via `toPageEventName`
// qui garantit un nom non falsy — c'est ce qui manquait aux events existants
// pour attribuer chaque étape du funnel à une contribution.

const emitViewBlocCc = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.VIEW_BLOC_CC,
    name: toPageEventName(path),
  });
};

const emitClickWhatIsAgreement = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.CLICK_WHAT_IS_AGREEMENT,
    name: toPageEventName(path),
  });
};

const emitSelectP1 = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_P1,
    name: toPageEventName(path),
  });
};

const emitSelectP2 = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_P2,
    name: toPageEventName(path),
  });
};

const emitSelectP3 = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_P3,
    name: toPageEventName(path),
  });
};

const emitStartAgreementSearch = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.START_AGREEMENT_SEARCH,
    name: toPageEventName(path),
  });
};

const emitNoResultAgreement = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.NO_RESULT_AGREEMENT,
    name: toPageEventName(path),
  });
};

const emitStartEnterpriseSearch = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.START_ENTERPRISE_SEARCH,
    name: toPageEventName(path),
  });
};

const emitSubmitEnterpriseSearch = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SUBMIT_ENTERPRISE_SEARCH,
    name: toPageEventName(path),
  });
};

const emitSelectLocation = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_LOCATION,
    name: toPageEventName(path),
  });
};

const emitNoResultEnterprise = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.NO_RESULT_ENTERPRISE,
    name: toPageEventName(path),
  });
};

const emitErrorEnterpriseSearch = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.ERROR_ENTERPRISE_SEARCH,
    name: toPageEventName(path),
  });
};

const emitSelectEnterprise = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_ENTERPRISE,
    name: toPageEventName(path),
  });
};

const emitEnterpriseWithoutAgreement = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.ENTERPRISE_WITHOUT_AGREEMENT,
    name: toPageEventName(path),
  });
};

const emitSelectEnterpriseAgreement = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_ENTERPRISE_AGREEMENT,
    name: toPageEventName(path),
  });
};

const emitSelectHouseholdEmployer = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.SELECT_HOUSEHOLD_EMPLOYER,
    name: toPageEventName(path),
  });
};

const emitClickModifyEnterprise = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.CLICK_MODIFY_ENTERPRISE,
    name: toPageEventName(path),
  });
};

const emitClickModifyAgreement = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.CLICK_MODIFY_AGREEMENT,
    name: toPageEventName(path),
  });
};

const emitClickDisplayInformation = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.CLICK_DISPLAY_INFORMATION,
    name: toPageEventName(path),
  });
};

const emitBlockedWithoutRoute = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.BLOCKED_WITHOUT_ROUTE,
    name: toPageEventName(path),
  });
};

const emitBlockedWithoutAgreementP1 = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.BLOCKED_WITHOUT_AGREEMENT_P1,
    name: toPageEventName(path),
  });
};

const emitBlockedWithoutAgreementP2 = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.BLOCKED_WITHOUT_AGREEMENT_P2,
    name: toPageEventName(path),
  });
};

const emitUntreatedAgreementRetained = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.UNTREATED_AGREEMENT_RETAINED,
    name: toPageEventName(path),
  });
};

const emitClickExternalAgreementLink = (path: string) => {
  sendEvent({
    category: TrackingContributionCategory.CC_SEARCH_FUNNEL,
    action: TrackingCcFunnelAction.CLICK_EXTERNAL_AGREEMENT_LINK,
    name: toPageEventName(path),
  });
};

// Objet figé, défini hors du hook : `AgreementSearchFormBlock` mémoïse l'objet
// de callbacks qu'il passe aux composants de recherche, ce qui exige une
// référence stable entre deux rendus (sinon les feuilles se re-rendraient à
// chaque frappe). Hook séparé de `useContributionTracking`, déjà consommé par
// sept composants qui n'ont que faire de ces vingt-quatre émetteurs.
const ccFunnelTracking = {
  emitViewBlocCc,
  emitClickWhatIsAgreement,
  emitSelectP1,
  emitSelectP2,
  emitSelectP3,
  emitStartAgreementSearch,
  emitNoResultAgreement,
  emitStartEnterpriseSearch,
  emitSubmitEnterpriseSearch,
  emitSelectLocation,
  emitNoResultEnterprise,
  emitErrorEnterpriseSearch,
  emitSelectEnterprise,
  emitEnterpriseWithoutAgreement,
  emitSelectEnterpriseAgreement,
  emitSelectHouseholdEmployer,
  emitClickModifyEnterprise,
  emitClickModifyAgreement,
  emitClickDisplayInformation,
  emitBlockedWithoutRoute,
  emitBlockedWithoutAgreementP1,
  emitBlockedWithoutAgreementP2,
  emitUntreatedAgreementRetained,
  emitClickExternalAgreementLink,
} as const;

export const useCcFunnelTracking = () => ccFunnelTracking;
