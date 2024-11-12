import React from "react";
import { notFound } from "next/navigation";
import { DsfrLayout } from "../../../src/modules/layout";
import { fetchFicheSP } from "../../../src/modules/fiche-service-public/queries";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { FicheServicePublicContainer } from "../../../src/modules/fiche-service-public/FicheServicePublicContainer";

export async function generateMetadata({ params }) {
  const { title, description } = await getFiche(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    path: `/${getRouteBySource(SOURCES.SHEET_SP)}/${params.slug}`,
  });
}

async function Fiche({ params }) {
  const {
    _id,
    breadcrumbs,
    date,
    description,
    raw,
    referencedTexts,
    title,
    url,
  } = await getFiche(params.slug);
  const relatedItems = await fetchRelatedItems({ _id }, params.slug);

  return (
    <DsfrLayout>
      <FicheServicePublicContainer
        title={title}
        relatedItems={relatedItems}
        date={date}
        url={url}
        metaDescription={description}
        raw={raw}
        breadcrumbs={breadcrumbs}
        referencedTexts={referencedTexts}
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
