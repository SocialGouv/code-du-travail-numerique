import React from "react";

import { WarningType } from "../utils/types";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  type?: WarningType;
  hasNotice: boolean;
};

export const titreFavorable =
  "Attention il peut exister une durée plus favorable";

export const titrePreavis =
  "Attention il peut quand même exister une durée de préavis";

const WarningResult: React.FC<Props> = ({ type, hasNotice }) => {
  return (
    <Alert
      severity="info"
      title={hasNotice ? titreFavorable : titrePreavis}
      data-testid="notice-warning"
      className={fr.cx("fr-my-3w")}
      description={
        <>
          {type === WarningType.noNoticeWithAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis. Dans ce cas, cette
                durée doit s&apos;appliquer.
              </p>
              <p>Nous vous conseillons de vérifiez cela.</p>
            </>
          ) : type === WarningType.noNoticeWithoutAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis. Dans ce cas, cette durée doit
                s&apos;appliquer.
              </p>
              <p>Nous vous conseillons de vérifiez cela.</p>
            </>
          ) : type === WarningType.departWithAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis
                <sup>(1)</sup> ou une condition d&apos;ancienneté<sup>(2)</sup>{" "}
                plus favorable pour le salarié. Dans ce cas, c&apos;est cette
                durée ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>

              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus courte.
              </p>
            </>
          ) : type === WarningType.miseWithAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis
                <sup>(1)</sup> ou une condition d&apos;ancienneté<sup>(2)</sup>{" "}
                plus favorable pour le salarié. Dans ce cas, c&apos;est cette
                durée ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>

              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.departWithoutAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis<sup>(1)</sup> ou une condition
                d&apos;ancienneté
                <sup>(2)</sup> plus favorable pour le salarié. Dans ce cas,
                c&apos;est cette durée ou cette ancienneté plus favorable qui
                s&apos;applique au salarié.
              </p>

              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus courte.
              </p>
            </>
          ) : type === WarningType.miseWithoutAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis<sup>(1)</sup> ou une condition
                d&apos;ancienneté
                <sup>(2)</sup> plus favorable pour le salarié. Dans ce cas,
                c&apos;est cette durée ou cette ancienneté plus favorable qui
                s&apos;applique au salarié.
              </p>

              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.miseWithoutCollectiveAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Le contrat de travail ou un usage peut prévoir une durée de
                préavis
                <sup>(1)</sup> ou une condition d&apos;ancienneté<sup>(2)</sup>{" "}
                plus favorable pour le salarié. Dans ce cas, c&apos;est cette
                durée ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>
              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.departWithoutCollectiveAgreement ? (
            <>
              <p data-testid="notice-warning-description">
                Le contrat de travail ou un usage peut prévoir une durée de
                préavis
                <sup>(1)</sup> ou une condition d&apos;ancienneté<sup>(2)</sup>{" "}
                plus favorable pour le salarié. Dans ce cas, c&apos;est cette
                durée ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>
              <p>
                <sup>(1)</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p>
                <sup>(2)</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus courte.
              </p>
            </>
          ) : null}
        </>
      }
    />
  );
};

export default WarningResult;
