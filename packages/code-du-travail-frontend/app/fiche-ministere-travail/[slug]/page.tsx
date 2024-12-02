import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { fetchFicheMT } from "../../../src/modules/fiche-ministere-travail/queries";
import { FicheMinistereTravail } from "../../../src/modules/fiche-ministere-travail/ficheMinistereTravail";
import { fetchRelatedItems } from "../../../src/modules/documents";

export async function generateMetadata({ params }) {
  const { title, description, url } = await getFiche(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    overrideCanonical: url,
  });
}

async function Fiche({ params }) {
  const {
    _id,
    title,
    description,
    date,
    intro,
    url,
    sections,
    breadcrumbs,
    highlight,
  } = await getFiche(params.slug);
  const relatedItems = await fetchRelatedItems({ _id }, params.slug);

  return (
    <DsfrLayout>
      <FicheMinistereTravail
        title={title}
        relatedItems={relatedItems}
        date={date}
        url={url}
        metaDescription={description}
        sections={sections}
        intro={intro}
        breadcrumbs={breadcrumbs}
        highlight={highlight}
      />
    </DsfrLayout>
  );
}

const getFiche = async (slug: string) => {
  const fiche = await fetchFicheMT(slug);

  if (!fiche) {
    return notFound();
  }
  return fiche;
};

export default Fiche;
