import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { WarningType } from "../utils/types";
import Alert from "@codegouvfr/react-dsfr/Alert";

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
      severity="warning"
      title={hasNotice ? titreFavorable : titrePreavis}
      data-testid="preavis-warning"
      description={
        <>
          {type === WarningType.noNoticeWithAgreement ? (
            <>
              <p>
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis. Dans ce cas, cette
                durée doit s&apos;appliquer.
              </p>
              <p>Nous vous conseillons de vérifiez cela.</p>
            </>
          ) : type === WarningType.noNoticeWithoutAgreement ? (
            <>
              <p>
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis. Dans ce cas, cette durée doit
                s&apos;appliquer.
              </p>
              <p>Nous vous conseillons de vérifiez cela.</p>
            </>
          ) : type === WarningType.departWithAgreement ? (
            <>
              <p>
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis
                <sup>*</sup> ou une condition d&apos;ancienneté<sup>*</sup> plus
                favorable pour le salarié. Dans ce cas, c&apos;est cette durée
                ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>

              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus courte.
              </p>
            </>
          ) : type === WarningType.miseWithAgreement ? (
            <>
              <p>
                Un accord collectif d&apos;entreprise, le contrat de travail ou
                un usage peut prévoir une durée de préavis
                <sup>*</sup> ou une condition d&apos;ancienneté<sup>*</sup> plus
                favorable pour le salarié. Dans ce cas, c&apos;est cette durée
                ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>

              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.departWithoutAgreement ? (
            <>
              <p>
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis<sup>*</sup> ou une condition
                d&apos;ancienneté
                <sup>*</sup> plus favorable pour le salarié. Dans ce cas,
                c&apos;est cette durée ou cette ancienneté plus favorable qui
                s&apos;applique au salarié.
              </p>

              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus courte.
              </p>
            </>
          ) : type === WarningType.miseWithoutAgreement ? (
            <>
              <p>
                Une convention collective de branche, un accord collectif
                d&apos;entreprise, le contrat de travail ou un usage peut
                prévoir une durée de préavis<sup>*</sup> ou une condition
                d&apos;ancienneté
                <sup>*</sup> plus favorable pour le salarié. Dans ce cas,
                c&apos;est cette durée ou cette ancienneté plus favorable qui
                s&apos;applique au salarié.
              </p>

              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.miseWithoutCollectiveAgreement ? (
            <>
              <p>
                Le contrat de travail ou un usage peut prévoir une durée de
                préavis
                <sup>*</sup> ou une condition d&apos;ancienneté<sup>*</sup> plus
                favorable pour le salarié. Dans ce cas, c&apos;est cette durée
                ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus longue.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
                pour le salarié = condition d&apos;ancienneté moins restrictive
                et conduisant à une durée de préavis plus longue.
              </p>
            </>
          ) : type === WarningType.departWithoutCollectiveAgreement ? (
            <>
              <p>
                Le contrat de travail ou un usage peut prévoir une durée de
                préavis
                <sup>*</sup> ou une condition d&apos;ancienneté<sup>*</sup> plus
                favorable pour le salarié. Dans ce cas, c&apos;est cette durée
                ou cette ancienneté plus favorable qui s&apos;applique au
                salarié.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;durée de préavis plus favorable pour le
                salarié = durée plus courte.
              </p>
              <p className={fr.cx("fr-text--xs")}>
                <sup>*</sup>&nbsp;condition d&apos;ancienneté plus favorable
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
