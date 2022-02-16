import precariteData from "@cdt/data...prime-precarite/precarite.data.json";
import heuresRecherchesEmploiData from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import demissionData from "@cdt/data...simulateurs/preavis-demission.data.json";
import licenciementData from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import { supportedCcn as retraiteData } from "@socialgouv/modeles-social";

import type { Agreement } from "../../conventions/Search/api/type";
import { matopush } from "../../piwik";
import { removeQueryParameters } from "..";
import { MatomoAgreementEvent, MatomoBaseEvent, MatomoTrackUrl } from ".";

const precariteDataFiltered = precariteData.filter(
  (situation) => situation.hasConventionalProvision !== null
);

export const trackConventionCollective = (
  ccn: Agreement | null,
  currentPath: string
): void => {
  if (!ccn || !currentPath) return;
  let isTreated = false;
  switch (removeQueryParameters(currentPath)) {
    case MatomoTrackUrl.PREAVIS_RETRAITE: {
      const idccInfo = retraiteData.find((item) => item.idcc == ccn.num);
      isTreated = !!(idccInfo && idccInfo.preavisRetraite);
      break;
    }
    case MatomoTrackUrl.PREAVIS_DEMISSION: {
      const idcc = demissionData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTreated = !!idcc;
      break;
    }
    case MatomoTrackUrl.PREAVIS_LICENCIEMENT: {
      const idcc = licenciementData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTreated = !!idcc;
      break;
    }
    case MatomoTrackUrl.HEURE_RECHERCHE_EMPLOI: {
      const idcc = heuresRecherchesEmploiData.situations.find(
        (item) => item.idcc == ccn.num
      );
      isTreated = !!idcc;
      break;
    }
    case MatomoTrackUrl.INDEMNITE_PRECARITE: {
      const idcc = precariteDataFiltered.find((item) => item.idcc == ccn.num);
      isTreated = !!idcc;
      break;
    }
    default: {
      return;
    }
  }
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    isTreated
      ? MatomoAgreementEvent.CC_TREATED
      : MatomoAgreementEvent.CC_UNTREATED,
    ccn.num,
  ]);
};
