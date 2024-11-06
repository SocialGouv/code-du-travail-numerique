import { SupportedTypes } from "@socialgouv/modeles-social";

export enum UserAction {
  OpenAgreementHelp = "open_agreement_help",
  OpenEnterpriseHelp = "open_enterprise_help",
  SelectEnterprise = "select_enterprise",
  SelectAgreement = "select_agreement",
  SearchEnterprise = "search_enterprise",
  SearchAgreement = "search_agreement",
  SelectAgreementRoute = "select_agreement_route",
  SelectEnterpriseRoute = "select_enterprise_route",
}

export type OnUserAction = (action: UserAction, extra?: unknown) => void;

export type TrackingProps = {
  onUserAction: OnUserAction;
};

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug?: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
  contributions: boolean;
};

export type AgreementSupportInfo = {
  fullySupported: SupportedTypes;
  idcc: number;
};
