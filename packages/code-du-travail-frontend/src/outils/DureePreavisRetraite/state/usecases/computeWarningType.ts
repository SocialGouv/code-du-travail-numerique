import { supportedCcn } from "@socialgouv/modeles-social";
import { Origin } from "../types";
import { WarningType } from "../../steps/ResultStep/Step";

enum StatusCcn {
  CCN_SUPPORTED = "CCN_SUPPORTED",
  CCN_UNSUPPORTED = "CCN_UNSUPPORTED",
  CC_UNSELECTED = "CC_UNSELECTED",
}

export const computeWarningType = ({
  resultValueInDays,
  ccNumber,
  type,
}: {
  resultValueInDays?: number;
  ccNumber?: number;
  type: Origin;
}): WarningType | null => {
  const idccInfo = supportedCcn.find((item) => item.idcc == ccNumber);
  const isPreavisRetraite = idccInfo && idccInfo.preavisRetraite;
  const statusCcn =
    ccNumber && isPreavisRetraite
      ? StatusCcn.CCN_SUPPORTED
      : ccNumber && !isPreavisRetraite
      ? StatusCcn.CCN_UNSUPPORTED
      : StatusCcn.CC_UNSELECTED;

  switch (true) {
    case ccNumber === 3239 && type === "départ":
      return WarningType.departWithoutCollectiveAgreement;
    case ccNumber === 3239 && type === "mise":
      return WarningType.miseWithoutCollectiveAgreement;
    case resultValueInDays === 0 && statusCcn === StatusCcn.CCN_SUPPORTED:
      return WarningType.noNoticeWithAgreement;
    case resultValueInDays === 0 &&
      (statusCcn === StatusCcn.CC_UNSELECTED ||
        statusCcn === StatusCcn.CCN_UNSUPPORTED):
      return WarningType.noNoticeWithoutAgreement;
    case type === "départ" && statusCcn === StatusCcn.CCN_SUPPORTED:
      return WarningType.departWithAgreement;
    case type === "mise" && statusCcn === StatusCcn.CCN_SUPPORTED:
      return WarningType.miseWithAgreement;
    case type === "départ" &&
      (statusCcn === StatusCcn.CC_UNSELECTED ||
        statusCcn === StatusCcn.CCN_UNSUPPORTED):
      return WarningType.departWithoutAgreement;
    case type === "mise" &&
      (statusCcn === StatusCcn.CC_UNSELECTED ||
        statusCcn === StatusCcn.CCN_UNSUPPORTED):
      return WarningType.miseWithoutAgreement;
    default:
      return null;
  }
};
