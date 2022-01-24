import precariteData from "@cdt/data...prime-precarite/precarite.data.json";
import heuresRecherchesEmploiData from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import demissionData from "@cdt/data...simulateurs/preavis-demission.data.json";
import licenciementData from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import { supportedCcn as retraiteData } from "@socialgouv/modeles-social";

import { ConventionCollective } from "../../outils/common/type/WizardType";
import { matopush } from "../../piwik";
import { removeQueryParameters } from "..";
import { MatomoAgreementEvent, MatomoBaseEvent, MatomoTrackUrl } from ".";

export const trackConventionCollective = (
  ccn: ConventionCollective | null,
  currentPath: string
): void => {
  if (!ccn || !currentPath) return;
  let isTracked = false;
  switch (removeQueryParameters(currentPath)) {
    case MatomoTrackUrl.PREAVIS_RETRAITE: {
      const idccInfo = retraiteData.find((item) => item.idcc == ccn.num);
      isTracked = !!(idccInfo && idccInfo.preavisRetraite);
      break;
    }
    case MatomoTrackUrl.PREAVIS_DEMISSION: {
      const idcc = demissionData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTracked = !!idcc;
      break;
    }
    case MatomoTrackUrl.PREAVIS_LICENCIEMENT: {
      const idcc = licenciementData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTracked = !!idcc;
      break;
    }
    case MatomoTrackUrl.HEURE_RECHERCHE_EMPLOI: {
      const idcc = heuresRecherchesEmploiData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTracked = !!idcc;
      break;
    }
    case MatomoTrackUrl.INDEMNITE_PRECARITE: {
      const idcc = precariteData.find((item) => item.idcc == ccn.num);
      isTracked = !!idcc;
      break;
    }
    default: {
      return;
    }
  }
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    isTracked
      ? MatomoAgreementEvent.CC_TREATED
      : MatomoAgreementEvent.CC_UNTREATED,
    ccn.num,
  ]);
};
