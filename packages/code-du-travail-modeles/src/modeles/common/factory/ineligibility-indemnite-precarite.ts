import { IneligibilityLegalIndemnitePrecarite } from "../../base";
import { SupportedCc } from "..";
import type { IIneligibility } from "../types/ineligibility";
import { IneligibilityIndemnitePrecarite1486 } from "../../conventions/1486_bureaux_etudes_techniques/ineligibility-indemnite-precarite";
import { IneligibilityIndemnitePrecarite1516 } from "../../conventions/1516_organismes_formation/ineligibility-indemnite-precarite";
import { IneligibilityIndemnitePrecarite2098 } from "../../conventions/2098_personnel_presta_service_tertiaire/ineligibility-indemnite-precarite";
import { IneligibilityIndemnitePrecarite2511 } from "../../conventions/2511_sport/ineligibility-indemnite-precarite";
import { IneligibilityIndemnitePrecarite3127 } from "../../conventions/3127_entreprises_services_a_la_personne/ineligibility-indemnite-precarite";

export class IneligibilityIndemnitePrecariteFactory {
  create<T extends SupportedCc>(idcc: T): IIneligibility {
    switch (idcc) {
      case SupportedCc.IDCC1486:
        return new IneligibilityIndemnitePrecarite1486();
      case SupportedCc.IDCC1516:
        return new IneligibilityIndemnitePrecarite1516();
      case SupportedCc.IDCC2098:
        return new IneligibilityIndemnitePrecarite2098();
      case SupportedCc.IDCC2511:
        return new IneligibilityIndemnitePrecarite2511();
      case SupportedCc.IDCC3127:
        return new IneligibilityIndemnitePrecarite3127();
      default:
        return new IneligibilityLegalIndemnitePrecarite();
    }
  }
}
