"use client";
import React from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Contribution } from "./type";
import { ContentMeta } from "../common/ContentMeta";
import { ContributionGeneric } from "./ContributionGeneric";
import { ContributionAgreement } from "./ContributionAgreement";
import { ArticleJsonLd, BreadcrumbListJsonLd } from "../seo/jsonld";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
// Import de type uniquement : queries.ts embarque le client Elasticsearch
// (serveur), il ne doit pas entrer dans le bundle client.
import type { GenericContributionInfos } from "./queries";

type Props = {
  contribution: Contribution;
  genericInfos?: GenericContributionInfos;
};

export function ContributionLayout({ contribution, genericInfos }: Props) {
  const { date, title, isGeneric, isFicheSP } = contribution;

  const genericSlug = !isGeneric
    ? removeCCNumberFromSlug(contribution.slug)
    : undefined;
  const hasNewBreadcrumb =
    !isGeneric && genericSlug === "les-conges-pour-evenements-familiaux";

  const breadcrumbSegments = contribution.breadcrumbs.map((breadcrumb) => ({
    label: breadcrumb.label,
    linkProps: { href: breadcrumb.slug },
  }));

  const currentPageLabel = hasNewBreadcrumb
    ? `${contribution.ccnShortTitle} (IDCC ${contribution.idcc})`
    : title;

  if (hasNewBreadcrumb) {
    breadcrumbSegments.push({
      label: title,
      linkProps: { href: `/contribution/${genericSlug}` },
    });
  }

  return (
    <>
      <BreadcrumbListJsonLd
        currentPageLabel={currentPageLabel}
        items={
          hasNewBreadcrumb
            ? [
                ...contribution.breadcrumbs.map((breadcrumb) => ({
                  label: breadcrumb.label,
                  href: breadcrumb.slug,
                })),
                {
                  label: title,
                  href: `/contribution/${genericSlug}`,
                },
              ]
            : contribution.breadcrumbs.map((breadcrumb) => ({
                label: breadcrumb.label,
                href: breadcrumb.slug,
              }))
        }
      />
      <Breadcrumb
        currentPageLabel={currentPageLabel}
        homeLinkProps={{
          href: "/",
        }}
        segments={breadcrumbSegments}
      />
      <h1 className={fr.cx("fr-mb-0")}>
        {title}
        {!isGeneric && (
          <span className={`fr-mt-4w ${h1Agreement}`}>
            {" "}
            {contribution.ccnShortTitle}
          </span>
        )}
      </h1>
      <ContentMeta
        date={date}
        breadcrumbs={contribution.breadcrumbs}
        source={
          isFicheSP
            ? { url: contribution.url, name: "Fiche service-public.gouv.fr" }
            : undefined
        }
      />
      <ArticleJsonLd
        title={title}
        datePublished={date}
        breadcrumbs={contribution.breadcrumbs}
      />
      {isGeneric ? (
        <ContributionGeneric contribution={contribution} />
      ) : (
        <ContributionAgreement
          contribution={contribution}
          genericInfos={genericInfos}
        />
      )}
    </>
  );
}

const h1Agreement = css({
  display: "block",
  fontSize: "1rem",
  fontWeight: "normal",
  lineHeight: "normal",
});
