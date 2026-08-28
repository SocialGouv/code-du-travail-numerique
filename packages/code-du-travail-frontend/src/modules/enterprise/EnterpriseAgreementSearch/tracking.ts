import { useTracking } from "../../analytics/events/useTracking";
import { ApiGeoResult } from "./searchCities";

// Le parcours entreprise est monté dans les simulateurs, dans les contributions
// et sur la page dédiée. Aucun de ces émetteurs n'a besoin qu'on lui dise
// lequel : `useTracking` le déduit de la route, et le met dans `path`.
export const useEnterpriseAgreementSearchTracking = () => {
  const { track } = useTracking();

  const emitEnterpriseAgreementSearchInputEvent = (
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    track("search_enterprise", {
      query,
      // On ne remonte que le nom de la commune et son département, pas l'objet
      // API brut : le reste (code INSEE, codes postaux, population, score)
      // alourdirait le nom d'event sans servir à l'analyse.
      city: apiGeoResult?.nom,
      department: apiGeoResult?.codeDepartement,
    });
  };

  const emitSelectEnterpriseEvent = (enterprise: {
    label: string;
    siren: string;
  }) => {
    track("select_enterprise", {
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

  const emitSelectEnterpriseAgreementEvent = (idcc: number) => {
    track("select_agreement_p2", { idcc });
  };

  const emitPreviousEvent = () => {
    track("click_previous_step_agreement_p2");
  };

  const emitNoEnterpriseClickEvent = () => {
    track("click_no_enterprise");
  };

  const emitNoEnterpriseSelectEvent = () => {
    track("select_no_enterprise");
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
