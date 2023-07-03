import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Agreement } from "@socialgouv/cdtn-utils";

export type AgreementSupportInfo = {
  fullySupported: boolean;
  idcc: number;
};

export type OnSelectAgreementFn = (
  agreement: Agreement | null,
  enterprise?: Enterprise
) => void;
