"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { EnterpriseAgreement } from "../enterprise";
import {
  isAgreementSupported,
  isAgreementUnextended,
  isAgreementValid,
} from "./contributionUtils";
import { Contribution } from "./type";
import Link from "../common/Link";
import BlueCard from "../common/BlueCard";

type Props = {
  onAgreementSelect: (agreement?: EnterpriseAgreement, mode?: string) => void;
  onDisplayClick: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  contribution: Contribution;
  defaultAgreement?: EnterpriseAgreement;
};

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  defaultAgreement,
}: Props) {
  const { slug, isNoCDT } = contribution;

  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  const [isValid, setIsValid] = useState(
    defaultAgreement ? isAgreementValid(contribution, defaultAgreement) : false
  );
  useEffect(() => {
    setIsValid(
      isAgreementValid(contribution, selectedAgreement ?? defaultAgreement)
    );
  }, [selectedAgreement, defaultAgreement]);
  const selectedAgreementAlert = (agreement: EnterpriseAgreement) => {
    const isSupported = isAgreementSupported(contribution, agreement);
    const isUnextended = isAgreementUnextended(contribution, agreement);
    if (contribution.isNoCDT) {
      if (isUnextended)
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
      if (!isSupported)
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
          onAgreementSelect={(agreement, mode) => {
            onAgreementSelect(agreement, mode);
            setSelectedAgreement(
              isAgreementValid(contribution, agreement) ? agreement : undefined
            );
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={defaultAgreement}
        />
        {((contribution.isNoCDT && isValid) || !contribution.isNoCDT) && (
          <Button
            className={fr.cx("fr-mt-2w")}
            linkProps={{
              href: isValid
                ? `/contribution/${(selectedAgreement ?? defaultAgreement)?.num}-${slug}`
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
