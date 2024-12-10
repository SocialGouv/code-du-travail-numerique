"use client";
import React, { useEffect, useState } from "react";
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
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import Html from "../common/Html";
import Link from "next/link";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  contribution: ContributionElasticDocument;
};

export function ContributionLayout({ relatedItems, contribution }: Props) {
  const { date, title, slug, idcc, metaDescription } = contribution;
  const isGeneric = idcc === "0000";
  const isNoCDT = contribution?.type === "generic-no-cdt";

  const [displayContent, setDisplayContent] = useState(false);
  const [displaySlug, setDisplaySlug] = useState(`/contribution/${slug}`);
  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  useEffect(() => {
    setDisplaySlug(
      selectedAgreement ? `/contribution/${selectedAgreement.num}-${slug}` : ""
    );
  }, [selectedAgreement]);
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
    <div>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={contribution.breadcrumbs.map((breadcrumb) => ({
          label: breadcrumb.label,
          linkProps: { href: breadcrumb.slug },
        }))}
      />
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
      <p className={fr.cx("fr-mt-6w")}>Mis à jour le&nbsp;: {date}</p>
      <div className={`${fr.cx("fr-p-3w", "fr-mt-6w")} ${block}`}>
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
                  setSelectedAgreement(
                    isAgreementValid(agreement) ? agreement : undefined
                  );
                }}
                selectedAgreementAlert={selectedAgreementAlert}
              ></AgreementSearchForm>
              {(!isGeneric || !isNoCDT || selectedAgreement) && (
                <Button
                  className={fr.cx("fr-mt-2w")}
                  linkProps={{
                    href: displaySlug,
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
      {isGeneric && !isNoCDT && (
        <Button
          className={fr.cx(
            !displayContent ? "fr-unhidden" : "fr-hidden",
            "fr-mt-2w",
            "fr-mb-6w"
          )}
          priority="tertiary no outline"
          onClick={() => setDisplayContent(true)}
        >
          Afficher les informations sans sélectionner une convention collective
        </Button>
      )}
      {isGeneric && !isNoCDT && (
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div
            className={fr.cx(
              "fr-col-12",
              "fr-col-md-8",
              "fr-mb-md-0",
              "fr-my-6w",
              displayContent ? "fr-unhidden" : "fr-hidden"
            )}
          >
            <div>
              <p className={fr.cx("fr-h5")}>Que dit le code du travail ?</p>
              <ContributionContent
                contribution={
                  contribution as
                    | ElasticSearchContributionGeneric
                    | ElasticSearchContributionConventionnelle
                }
                titleLevel={2}
              ></ContributionContent>
              {contribution.references.length && (
                <div className={fr.cx("fr-callout", "fr-mt-6w")}>
                  <span className={fr.cx("fr-h3")}>Références</span>
                  <ul>
                    {contribution.references.map(({ title, url }) => (
                      <li key={title}>
                        <Link href={url}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {contribution.messageBlock && (
                <div
                  className={fr.cx("fr-alert", "fr-alert--info", "fr-my-6w")}
                >
                  <>
                    <div className={fr.cx("fr-h5")}>Attention</div>
                    <Html>{contribution.messageBlock}</Html>
                  </>
                </div>
              )}
            </div>
          </div>
          <div
            className={fr.cx(
              "fr-col-12",
              "fr-col-md-4",
              "fr-mt-6w",
              displayContent ? "fr-unhidden" : "fr-hidden"
            )}
          >
            <div>
              <RelatedItems relatedItems={relatedItems} />
              <Share title={title} metaDescription={metaDescription} />
            </div>
          </div>
        </div>
      )}
      {!isGeneric && (
        <div
          className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-my-6w")}
        >
          <div
            className={fr.cx(
              "fr-col-12",
              "fr-col-md-8",
              "fr-mb-6w",
              "fr-mb-md-0"
            )}
          >
            <ContributionContent
              contribution={
                contribution as
                  | ElasticSearchContributionGeneric
                  | ElasticSearchContributionConventionnelle
              }
              titleLevel={3}
            ></ContributionContent>
            {contribution.references.length && (
              <div className={fr.cx("fr-callout", "fr-mt-6w")}>
                <span className={fr.cx("fr-h3")}>Références</span>
                <ul>
                  {contribution.references.map(({ title, url }) => (
                    <li key={title}>
                      <Link href={url}>{title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {contribution.messageBlock && (
              <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-6w")}>
                <>
                  <div className={fr.cx("fr-h5")}>Attention</div>
                  <Html>{contribution.messageBlock}</Html>
                </>
              </div>
            )}
          </div>
          <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
            <RelatedItems relatedItems={relatedItems} />
            <Share title={title} metaDescription={metaDescription} />
          </div>
        </div>
      )}
      <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-mb-6w")}>
        <Feedback></Feedback>
      </div>
    </div>
  );
}

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
