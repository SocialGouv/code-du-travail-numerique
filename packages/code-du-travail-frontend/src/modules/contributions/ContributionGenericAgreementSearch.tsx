"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import { Agreement } from "src/modules/outils/common/indemnite-depart/types";
import {
  isAgreementSupported,
  isAgreementUnextended,
  isAgreementValid,
} from "./contributionUtils";
import { Contribution } from "./type";
import Link from "../common/Link";
import BlueCard from "../common/BlueCard";
import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
};

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
}: Props) {
  const { slug } = contribution;
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(isAgreementValid(contribution, selectedAgreement));
  }, [selectedAgreement]);

  const selectedAgreementAlert = (agreement: Agreement) => {
    const isSupported = isAgreementSupported(contribution, agreement);
    const isUnextended = isAgreementUnextended(contribution, agreement);
    if (contribution.isNoCDT) {
      if (isUnextended && agreement.url)
        return (
          <>
            Les dispositions de cette convention n’ont pas été étendues. Cela
            signifie qu&apos;elles ne s&apos;appliquent qu&apos;aux entreprises
            adhérentes à l&apos;une des organisations signataires de
            l&apos;accord. Dans ce contexte, nous ne sommes pas en mesure
            d&apos;identifier si cette règle s&apos;applique ou non au sein de
            votre entreprise. Vous pouvez toutefois consulter la convention
            collective{" "}
            <Link target="_blank" href={agreement.url}>
              ici
            </Link>{" "}
            dans le cas où elle s&apos;applique à votre situation.
          </>
        );
      if (!isSupported && agreement.url)
        return (
          <>
            Nous vous invitons à consulter votre convention collective qui peut
            prévoir une réponse. Vous pouvez consulter votre convention
            collective{" "}
            <Link target="_blank" href={agreement.url}>
              ici
            </Link>
            .
            <br />
            {contribution.messageBlockGenericNoCDT}
          </>
        );
    }
    if (!isSupported)
      return <>Vous pouvez consulter les informations générales ci-dessous.</>;
  };
  return (
    <BlueCard>
      <div className={fr.cx("fr-grid-row")}>
        <Image
          priority
          src={AgreementSearch}
          alt=""
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <p className={fr.cx("fr-h3", "fr-mt-1w")}>
          Personnalisez la réponse avec votre convention collective
        </p>
      </div>
      <div>
        <AgreementSearchForm
          onAgreementSelect={onAgreementSelect}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={selectedAgreement}
          trackingActionName={trackingActionName}
        />
        {((contribution.isNoCDT && isValid) || !contribution.isNoCDT) && (
          <Button
            className={fr.cx("fr-mt-2w")}
            linkProps={{
              href:
                isValid && selectedAgreement
                  ? `/contribution/${selectedAgreement?.num}-${slug}`
                  : "",
              onClick: onDisplayClick,
            }}
          >
            Afficher les informations
          </Button>
        )}
      </div>
    </BlueCard>
  );
}
