"use client";
import React, { useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItem } from "../documents";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { Feedback } from "../layout/feedback";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { EnterpriseAgreement } from "../enterprise";
import Card from "@codegouvfr/react-dsfr/Card";
import { removeCCNumberFromSlug } from "../common/utils";
import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import { ContributionElasticDocument } from "./type";
import { ContributionContent } from "./ContributionContent";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  contribution: ContributionElasticDocument;
};

export function ContributionLayout({ relatedItems, contribution }: Props) {
  const { date, title, slug, idcc, metaDescription } = contribution;
  const isGeneric = idcc === "0000";
  const isNoCDT = contribution?.type === "generic-no-cdt";

  const [displayContent, setDisplayContent] = useState(false);
  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  const isCCSupported = (
    agreement: EnterpriseAgreement,
    ccSupported: string[]
  ) => {
    return ccSupported.includes(agreement.id);
  };
  const isCCUnextended = (
    agreement: EnterpriseAgreement,
    ccUnextended: string[]
  ) => {
    return ccUnextended.includes(agreement?.id);
  };
  const isAgreementValid = (agreement?: EnterpriseAgreement) => {
    if (!agreement) return false;
    const { ccSupported, ccUnextended } =
      contribution as ElasticSearchContributionGeneric;
    const isSupported = isCCSupported(agreement, ccSupported);
    const isUnextended = isCCUnextended(agreement, ccUnextended);
    return !isUnextended && isSupported;
  };
  const selectedAgreementAlert = (agreement: EnterpriseAgreement) => {
    const { ccSupported, ccUnextended } =
      contribution as ElasticSearchContributionGeneric;
    const isSupported = isCCSupported(agreement, ccSupported);
    const isUnextended = isCCUnextended(agreement, ccUnextended);
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
    <div className={fr.cx("fr-grid-row--gutters", "fr-my-4w", "fr-my-md-12w")}>
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
      <p>Mis à jour le&nbsp;: {date}</p>
      <div className={`${fr.cx("fr-p-3w")} ${block}`}>
        {isGeneric ? (
          <>
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
                onAgreementSelect={(agreement) => {
                  if (isAgreementValid(agreement))
                    setSelectedAgreement(agreement);
                }}
                selectedAgreementAlert={selectedAgreementAlert}
              ></AgreementSearchForm>
              {(!isGeneric || !isNoCDT || selectedAgreement) && (
                <Button
                  className={fr.cx("fr-mt-2w")}
                  linkProps={{
                    href: selectedAgreement
                      ? `/contribution/${selectedAgreement?.num}-${slug}`
                      : "",
                    onClick: (ev) => {
                      if (!selectedAgreement) {
                        ev.preventDefault();
                        setDisplayContent(true);
                      }
                    },
                  }}
                >
                  Afficher les informations
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={"fr-grid-row"}>
              <span className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
                Réponse personnalisée pour la convention collective
              </span>
            </div>
            <Card
              title={`${(contribution as ElasticSearchContributionConventionnelle).ccnShortTitle} IDCC${contribution.idcc}`}
              size="small"
              titleAs="h2"
              className={fr.cx("fr-mt-2w")}
              classes={{
                content: fr.cx("fr-p-2w"),
                start: fr.cx("fr-m-0"),
                end: fr.cx("fr-p-0", "fr-m-0"),
              }}
            ></Card>
            <Button
              className={fr.cx("fr-mt-2w")}
              linkProps={{
                href: `/contribution/${removeCCNumberFromSlug(slug)}`,
              }}
              priority="secondary"
            >
              Modifier
            </Button>
          </>
        )}
      </div>
      <div className={fr.cx("fr-grid-row")}>
        {!isNoCDT && (
          <div
            className={fr.cx(
              "fr-col-12",
              "fr-col-md-7",
              "fr-mb-6w",
              "fr-mb-md-0",
              "fr-mt-2w"
            )}
          >
            {isGeneric ? (
              <>
                <Button
                  className={fr.cx(
                    !displayContent ? "fr-unhidden" : "fr-hidden",
                    "fr-mb-2w"
                  )}
                  priority="tertiary no outline"
                  onClick={() => setDisplayContent(true)}
                >
                  Afficher les informations sans sélectionner une convention
                  collective
                </Button>
                <div
                  className={fr.cx(
                    displayContent ? "fr-unhidden" : "fr-hidden"
                  )}
                >
                  <ContributionContent
                    contribution={
                      contribution as
                        | ElasticSearchContributionGeneric
                        | ElasticSearchContributionConventionnelle
                    }
                    titleLevel={2}
                  ></ContributionContent>
                </div>
                <Feedback></Feedback>
              </>
            ) : (
              <>
                <ContributionContent
                  contribution={
                    contribution as
                      | ElasticSearchContributionGeneric
                      | ElasticSearchContributionConventionnelle
                  }
                  titleLevel={3}
                ></ContributionContent>
              </>
            )}
          </div>
        )}
        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metaDescription} />
        </div>
      </div>
    </div>
  );
}

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
