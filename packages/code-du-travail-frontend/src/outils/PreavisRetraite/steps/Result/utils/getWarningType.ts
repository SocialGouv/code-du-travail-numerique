import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { WarningType } from "./types";

export const getWarningType = (
  type?: DepartOuMiseRetraite,
  ccNumber?: number,
  resultInDays?: number,
  isAgreementSupported?: boolean,
): WarningType | undefined => {
  switch (true) {
    case ccNumber === 3239 && type === "depart-retraite":
      return WarningType.departWithoutCollectiveAgreement;
    case ccNumber === 3239 && type === "mise-retraite":
      return WarningType.miseWithoutCollectiveAgreement;
    case resultInDays === 0 && isAgreementSupported:
      return WarningType.noNoticeWithAgreement;
    case resultInDays === 0 && !isAgreementSupported:
      return WarningType.noNoticeWithoutAgreement;
    case type === "depart-retraite" && isAgreementSupported:
      return WarningType.departWithAgreement;
    case type === "mise-retraite" && isAgreementSupported:
      return WarningType.miseWithAgreement;
    case type === "depart-retraite" && !isAgreementSupported:
      return WarningType.departWithoutAgreement;
    case type === "mise-retraite" && !isAgreementSupported:
      return WarningType.miseWithoutAgreement;
    default:
      return undefined;
  }
};
