import React from "react";
import { notFound } from "next/navigation";
import { DsfrLayout } from "../../../src/modules/layout";
import { fetchFicheSP } from "../../../src/modules/fiche-service-public/queries";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { FicheServicePublicContainer } from "../../../src/modules/fiche-service-public/FicheServicePublicContainer";
import { fetchFicheSPRecommendedLinks } from "../../../src/modules/fiche-service-public/recommended-links";

export async function generateMetadata(props) {
  const params = await props.params;
  const { title, description, url } = await getFiche(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    path: `/${getRouteBySource(SOURCES.SHEET_SP)}/${params.slug}`,
    overrideCanonical: url,
  });
}

async function Fiche(props) {
  const params = await props.params;
  const {
    breadcrumbs,
    date,
    description,
    raw,
    referencedTexts,
    slug,
    title,
    url,
    links,
  } = await getFiche(params.slug);
  const recommendedLinks = await fetchFicheSPRecommendedLinks(
    breadcrumbs,
    links
  );

  return (
    <DsfrLayout>
      <FicheServicePublicContainer
        title={title}
        date={date}
        url={url}
        metaDescription={description}
        raw={raw}
        breadcrumbs={breadcrumbs}
        referencedTexts={referencedTexts}
        slug={slug}
        recommendedLinks={recommendedLinks}
      />
    </DsfrLayout>
  );
}

const getFiche = async (slug: string) => {
  const fiche = await fetchFicheSP(slug);

  if (!fiche) {
    return notFound();
  }
  return fiche;
};

export default Fiche;
