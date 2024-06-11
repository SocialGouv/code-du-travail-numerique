import { SupportedTypes } from "@socialgouv/modeles-social";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../outils/types";

export type AgreementSupportInfo = {
  fullySupported: SupportedTypes;
  idcc: number;
};

export type OnSelectAgreementFn = (
  agreement: Agreement | null,
  enterprise?: Enterprise
) => void;
