import React from "react";
import Link from "next/link";
import { LicenciementSituation, Agreement } from "../utils/types";

type Props = {
  legalSituation?: LicenciementSituation;
  agreementSituation?: LicenciementSituation;
  ccn?: Agreement;
};

const isNotNearZero = (value: number): boolean => {
  return Math.abs(value) > 0.01;
};

export const DisclaimerText: React.FC<Props> = ({
  legalSituation,
  agreementSituation,
  ccn,
}) => {
  if (ccn && ccn.num === "3239") {
    return (
      <div className="fr-text--sm">
        Le contrat de travail ou un usage peut prévoir une durée de préavis ou
        une condition d&apos;ancienneté plus favorable pour le salarié. Dans ce
        cas, c&apos;est cette durée ou cette ancienneté plus favorable qui
        s&apos;applique au salarié.
      </div>
    );
  }

  if (!legalSituation) {
    return <></>;
  }

  if (!agreementSituation) {
    if (legalSituation.duration === 0) {
      return (
        <div className="fr-text--sm">
          <p className="fr-mb-2w">
            L&apos;existence et la durée du préavis de licenciement peuvent être
            prévues dans la convention collective, un accord d&apos;entreprise
            ou à défaut par un usage dans l&apos;entreprise.
          </p>
          {ccn && (
            <p className="fr-mb-0">
              <strong>Convention collective :</strong> {ccn.shortTitle}
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className="fr-text--sm">
          <p className="fr-mb-2w">
            Une durée de préavis de licenciement ou une condition
            d&apos;ancienneté plus favorable au salarié peut être prévue par une
            convention collective, un accord de branche, un accord
            d&apos;entreprise ou le contrat de travail ou les usages.
          </p>
          {ccn && (
            <p className="fr-mb-0">
              <strong>Convention collective :</strong> {ccn.shortTitle}
            </p>
          )}
        </div>
      );
    }
  } else {
    if (isNotNearZero(legalSituation.duration)) {
      return (
        <div className="fr-text--sm">
          <p className="fr-mb-0">
            Une durée de préavis de licenciement ou une condition
            d&apos;ancienneté plus favorable au salarié que ce que prévoit le
            code du travail peut être prévue par la loi pour certains cas
            particuliers, par un accord d&apos;entreprise, le contrat de travail
            ou les usages.
          </p>
        </div>
      );
    } else if (isNotNearZero(agreementSituation.duration)) {
      return (
        <div className="fr-text--sm">
          <p className="fr-mb-0">
            L&apos;existence ou la durée du préavis de licenciement peut aussi
            être prévue dans un accord d&apos;entreprise ou à défaut par un
            usage dans l&apos;entreprise.
          </p>
        </div>
      );
    } else {
      // both cc and legal === 0
      return (
        <div className="fr-text--sm">
          <p className="fr-mb-0">
            L&apos;existence ou la durée du préavis de licenciement peut être
            prévue, par la loi pour certains cas particuliers, par un accord
            d&apos;entreprise ou à défaut par un usage dans l&apos;entreprise.
          </p>
        </div>
      );
    }
  }
};
