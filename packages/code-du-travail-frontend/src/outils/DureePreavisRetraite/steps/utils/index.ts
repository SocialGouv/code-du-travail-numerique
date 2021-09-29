import { PublicodesResult } from "../../../publicodes";
import { NoticeUsed } from "../component/DecryptedResult";

export function formatSeniority(initialSeniority: string): string {
  const integerSeniority = parseInt(initialSeniority);
  return isNaN(integerSeniority) ? "0" : integerSeniority.toString();
}

export const generateNoticeUsed = (
  legalResult: PublicodesResult,
  agreementResult: PublicodesResult,
  result: PublicodesResult
): NoticeUsed => {
  if (!agreementResult) {
    return NoticeUsed.none;
  } else if (JSON.stringify(agreementResult) === JSON.stringify(legalResult)) {
    return NoticeUsed.same;
  } else if (JSON.stringify(result) === JSON.stringify(legalResult)) {
    return NoticeUsed.legal;
  } else if (JSON.stringify(result) === JSON.stringify(agreementResult)) {
    return NoticeUsed.agreementLabor;
  }
  return NoticeUsed.none;
};
