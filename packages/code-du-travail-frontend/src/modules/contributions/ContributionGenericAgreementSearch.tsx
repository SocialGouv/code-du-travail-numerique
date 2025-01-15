"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { EnterpriseAgreement } from "../enterprise";
import { ElasticSearchContributionGeneric } from "@socialgouv/cdtn-types";
import {
  isAgreementValid,
  isCCSupported,
  isCCUnextended,
} from "./contributionUtils";

type Props = {
  onAgreementSelect: (agreement?: EnterpriseAgreement, mode?: string) => void;
  onDisplayClick: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  contribution: ElasticSearchContributionGeneric;
};

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
}: Props) {
  const { slug } = contribution;

  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  const [displaySlug, setDisplaySlug] = useState(`/contribution/${slug}`);
  useEffect(() => {
    setDisplaySlug(
      selectedAgreement && isAgreementValid(contribution, selectedAgreement)
        ? `/contribution/${selectedAgreement.num}-${slug}`
        : ""
    );
  }, [selectedAgreement]);
  const selectedAgreementAlert = (agreement: EnterpriseAgreement) => {
    const isSupported = isCCSupported(contribution, agreement);
    const isUnextended = isCCUnextended(contribution, agreement);
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
          <span className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
            Personnalisez la réponse avec votre convention collective
          </span>
        </div>
        <div>
          <AgreementSearchForm
            onAgreementSelect={(agreement, mode) => {
              onAgreementSelect(agreement, mode);
              setSelectedAgreement(agreement);
            }}
            selectedAgreementAlert={selectedAgreementAlert}
          />
          <Button
            className={fr.cx("fr-mt-2w")}
            linkProps={{
              href: displaySlug,
              onClick: onDisplayClick,
            }}
          >
            Afficher les informations
          </Button>
        </div>
      </div>
    </>
  );
}

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
