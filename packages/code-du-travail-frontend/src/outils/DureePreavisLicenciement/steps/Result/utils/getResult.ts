import { LicenciementSituation } from "./types";

export const getResult = ({
  legalSituation,
  agreementSituation,
  disabledWorker = true,
}: {
  legalSituation?: LicenciementSituation;
  agreementSituation?: LicenciementSituation;
  disabledWorker: boolean | undefined;
}): string => {
  const durationMax = Math.max(
    legalSituation?.duration ?? 0,
    agreementSituation?.duration ?? 0
  );
  if (durationMax === 0) {
    return "Aucun préavis";
  }
  const isLegalSituationBetterThanAgreement =
    (legalSituation?.duration ?? 0) > (agreementSituation?.duration ?? 0);

  if (disabledWorker) {
    const durationHandicappedMax = 90;
    let durationHandicapped = 1;
    if (durationMax < durationHandicappedMax) {
      durationHandicapped = Math.min(durationHandicappedMax / durationMax, 2);
    }

    const result = durationMax * durationHandicapped;

    return result >= 30
      ? `${result / 30} mois`
      : `${result} jour${result > 1 ? "s" : ""}`;
  } else if (isLegalSituationBetterThanAgreement && legalSituation) {
    return legalSituation.answer;
  } else if (!isLegalSituationBetterThanAgreement && agreementSituation) {
    return agreementSituation.answer;
  }
  return "";
};
