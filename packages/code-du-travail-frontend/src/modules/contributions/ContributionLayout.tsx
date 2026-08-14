"use client";
import React from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { AgreementDeclination, Contribution } from "./type";
import { ContentMeta } from "../common/ContentMeta";
import { ContributionGeneric } from "./ContributionGeneric";
import { ContributionAgreement } from "./ContributionAgreement";
import { ArticleJsonLd } from "../seo/jsonld";
import { Breadcrumbs, fromDocumentBreadcrumbs } from "../layout/breadcrumb";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
// Import de type uniquement : queries.ts embarque le client Elasticsearch
// (serveur), il ne doit pas entrer dans le bundle client.
import type { GenericContributionInfos } from "./queries";

type Props = {
  contribution: Contribution;
  genericInfos?: GenericContributionInfos;
  // Déclinaisons par convention collective, résolues côté serveur. Vide sur une
  // page CC : seule la fiche générique affiche la liste.
  agreementDeclinations?: AgreementDeclination[];
};

export function ContributionLayout({
  contribution,
  genericInfos,
  agreementDeclinations = [],
}: Props) {
  const { date, title, isGeneric, isFicheSP } = contribution;

  const genericSlug = !isGeneric
    ? removeCCNumberFromSlug(contribution.slug)
    : undefined;
  const hasNewBreadcrumb =
    !isGeneric && genericSlug === "les-conges-pour-evenements-familiaux";

  const currentPageLabel = hasNewBreadcrumb
    ? `${contribution.ccnShortTitle} (IDCC ${contribution.idcc})`
    : title;

  const breadcrumbSegments = [
    ...fromDocumentBreadcrumbs(contribution.breadcrumbs),
    // Sur les pages CC de l'expérimentation, le fil intercale la fiche
    // générique avant la convention collective.
    ...(hasNewBreadcrumb
      ? [{ label: title, href: `/contribution/${genericSlug}` }]
      : []),
  ];

  return (
    <>
      <Breadcrumbs
        currentPageLabel={currentPageLabel}
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
        <ContributionGeneric
          contribution={contribution}
          agreementDeclinations={agreementDeclinations}
        />
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
