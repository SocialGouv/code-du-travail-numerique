import { sendEvent } from "@socialgouv/matomo-next";

export enum TrackingHeaderAgreementCategory {
  HEADER_CC = "header_cc",
}

export enum TrackingHeaderAgreementAction {
  OPEN_MODAL = "open_modal",
  CC_CONSULT = "cc_consult",
  CC_TREATED = "cc_select_processed",
  CC_UNTREATED = "cc_select_unprocessed",
}

export const useHeaderAgreementTracking = () => {
  const emitOpenModalEvent = () => {
    sendEvent({
      category: TrackingHeaderAgreementCategory.HEADER_CC,
      action: TrackingHeaderAgreementAction.OPEN_MODAL,
    });
  };

  const emitSelectEvent = (idcc: string, isTreated: boolean) => {
    sendEvent({
      category: TrackingHeaderAgreementCategory.HEADER_CC,
      action: isTreated
        ? TrackingHeaderAgreementAction.CC_TREATED
        : TrackingHeaderAgreementAction.CC_UNTREATED,
      name: idcc,
    });
  };

  const emitConsultEvent = (idcc: string) => {
    sendEvent({
      category: TrackingHeaderAgreementCategory.HEADER_CC,
      action: TrackingHeaderAgreementAction.CC_CONSULT,
      name: idcc,
    });
  };

  return {
    emitOpenModalEvent,
    emitSelectEvent,
    emitConsultEvent,
  };
};
