import { useTracking } from "../../../analytics/events/useTracking";

export const useAccordEnterpriseTracking = () => {
  const { track } = useTracking();

  const emitClickAccord = (url: string) => {
    track("click_enterprise_accord", { target: url });
  };

  const emitClickSeeAll = (siret: string) => {
    track("click_all_enterprise_accords", { siret });
  };

  // Chargement réussi des accords. `count` est le VRAI total du SIRET, pas la
  // longueur de la liste affichée (plafonnée à ACCORDS_MAX_RESULTS) : la fiche
  // Carrefour déclare 19 accords et n'en montre que 5.
  //
  // Le cas `count: 0` — « aucun accord trouvé » — représentait 76 % des events
  // de cette action et était intégralement perdu par l'ancien schéma : `name:
  // "0"` est falsy en PHP, Matomo jetait le nom. L'enveloppe JSON le conserve.
  const emitShowAccords = (count: number) => {
    track("show_enterprise_accords", { count }, count);
  };

  const emitLoadAccordsFailed = (siret: string) => {
    track("load_enterprise_accords_failed", { siret });
  };

  return {
    emitClickAccord,
    emitClickSeeAll,
    emitShowAccords,
    emitLoadAccordsFailed,
  };
};
