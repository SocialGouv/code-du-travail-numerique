"use client";
import React from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { AgreementDeclination, Contribution } from "./type";
import { ContentMeta } from "../common/ContentMeta";
import { ContributionGeneric } from "./ContributionGeneric";
import { ContributionAgreement } from "./ContributionAgreement";
import { ArticleJsonLd } from "../seo/jsonld";
import { Breadcrumbs, listingSegment } from "../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
// Import de type uniquement : queries.ts embarque le client Elasticsearch
// (serveur), il ne doit pas entrer dans le bundle client.
import type { GenericContributionInfos } from "./queries";
import type { ExploreTheme } from "./explore-themes/type";

type Props = {
  contribution: Contribution;
  genericInfos?: GenericContributionInfos;
  // Déclinaisons par convention collective, résolues côté serveur. Vide sur une
  // page CC : seule la fiche générique affiche la liste.
  agreementDeclinations?: AgreementDeclination[];
  // Sous-thèmes mis en avant (#7455), résolus côté serveur depuis le mapping
  // éditorial. Vide tant que la contribution n'y figure pas : la rubrique est
  // alors masquée et les « Articles liés » conservés.
  exploreThemes?: ExploreTheme[];
};

export function ContributionLayout({
  contribution,
  genericInfos,
  agreementDeclinations = [],
  exploreThemes = [],
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

  // Le fil d'Ariane remonte vers la page qui regroupe les fiches pratiques, et
  // non plus vers la chaîne de thèmes : celle-ci est portée par les tags
  // cliquables de ContentMeta, juste sous le titre.
  const breadcrumbSegments = [
    listingSegment(SOURCES.CONTRIBUTIONS),
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
          exploreThemes={exploreThemes}
        />
      ) : (
        <ContributionAgreement
          contribution={contribution}
          genericInfos={genericInfos}
          exploreThemes={exploreThemes}
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
