import { SupportedTypes } from "@socialgouv/modeles-social";

export type OuiNon = "oui" | "non";

export type AgreementInformation = {
  label: string;
  value: string;
  unit?: string;
};

export type AgreementSupportInfo = {
  fullySupported: SupportedTypes;
  idcc: number;
};
