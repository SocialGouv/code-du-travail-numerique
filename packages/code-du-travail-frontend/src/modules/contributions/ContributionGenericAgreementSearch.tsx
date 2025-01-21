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
  isAgreementValid,
  isCCSupported,
  isCCUnextended,
} from "./contributionUtils";
import { Contribution } from "./type";

type Props = {
  onAgreementSelect: (agreement?: EnterpriseAgreement, mode?: string) => void;
  onDisplayClick: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  contribution: Contribution;
};

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
}: Props) {
  const { slug } = contribution;

  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  const selectedAgreementAlert = (agreement: EnterpriseAgreement) => {
    const isSupported = isCCSupported(contribution, agreement);
    const isUnextended = isCCUnextended(contribution, agreement);
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
            <a target="_blank" href={agreement.url}>
              ici
            </a>{" "}
            dans le cas où elle s&apos;applique à votre situation.
          </>
        );
      if (!isSupported)
        return (
          <>
            Nous vous invitons à consulter votre convention collective qui peut
            prévoir une réponse. Vous pouvez consulter votre convention
            collective{" "}
            <a target="_blank" href={agreement.url}>
              ici
            </a>
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
    <>
      <div className={`${fr.cx("fr-p-3w", "fr-mt-6w")} ${block}`}>
        <div className={"fr-grid-row"}>
          <Image
            priority
            src={AgreementSearch}
            alt="Personnalisez la réponse avec votre convention collective"
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
                isAgreementValid(contribution, agreement)
                  ? agreement
                  : undefined
              );
            }}
            selectedAgreementAlert={selectedAgreementAlert}
          />
          {(!contribution.isNoCDT || selectedAgreement) && (
            <Button
              className={fr.cx("fr-mt-2w")}
              linkProps={{
                href: selectedAgreement
                  ? `/contribution/${selectedAgreement.num}-${slug}`
                  : "",
                onClick: onDisplayClick,
              }}
            >
              Afficher les informations
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
