import { useTracking } from "../../analytics/events/useTracking";
import { toEventName } from "../../analytics/eventName";
import { AGREEMENT_SEARCH_TOOL } from "../../convention-collective/tracking";
import { ApiGeoResult } from "./searchCities";

export const useEnterpriseAgreementSearchTracking = () => {
  const { track } = useTracking();

  const emitEnterpriseAgreementSearchInputEvent = (
    context: string,
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    track("search_enterprise", {
      context: toEventName(context),
      query,
      // On ne remonte que le nom de la commune et son département, pas l'objet
      // API brut : le reste (code INSEE, codes postaux, population, score)
      // alourdirait le nom d'event sans servir à l'analyse.
      city: apiGeoResult?.nom,
      department: apiGeoResult?.codeDepartement,
    });
  };

  const emitSelectEnterpriseEvent = (
    context: string,
    enterprise: {
      label: string;
      siren: string;
    }
  ) => {
    track("select_enterprise", {
      context: toEventName(context),
      label: enterprise.label,
      siren: enterprise.siren,
    });
  };

  // Affichage des conventions collectives d'une entreprise, tous parcours
  // confondus (simulateurs, contributions, page dédiée, widget), Y COMPRIS
  // quand l'entreprise n'en déclare AUCUNE.
  //
  // Ce cas `count: 0` était précisément celui que l'ancien schéma perdait :
  // `name: "0"` est falsy en PHP, Matomo comptait l'event et jetait le nom. Dans
  // l'enveloppe JSON, `{"count":0,…}` est une chaîne non vide, donc conservée.
  // `value` double le compteur pour l'agrégation, mais n'en est jamais le seul
  // porteur (Matomo ne conserve pas non plus une `value` de 0).
  const emitShowAgreements = (count: number) => {
    track("show_enterprise_agreements", { count }, count);
  };

  // `idcc` est le NUMÉRO brut de la convention, comme partout ailleurs : le
  // préfixe « idcc » de l'ancien schéma devient inutile une fois la donnée
  // nommée par sa clé de payload.
  const emitSelectEnterpriseAgreementEvent = (
    idcc: number,
    context: string
  ) => {
    track("select_agreement_p2", { idcc, context: toEventName(context) });
  };

  const emitPreviousEvent = () => {
    track("click_previous_step_agreement_p2", {
      context: AGREEMENT_SEARCH_TOOL,
    });
  };

  const emitNoEnterpriseClickEvent = () => {
    track("click_no_enterprise", { context: AGREEMENT_SEARCH_TOOL });
  };

  const emitNoEnterpriseSelectEvent = () => {
    track("select_no_enterprise", { context: AGREEMENT_SEARCH_TOOL });
  };

  return {
    emitEnterpriseAgreementSearchInputEvent,
    emitSelectEnterpriseEvent,
    emitShowAgreements,
    emitSelectEnterpriseAgreementEvent,
    emitPreviousEvent,
    emitNoEnterpriseClickEvent,
    emitNoEnterpriseSelectEvent,
  };
};
