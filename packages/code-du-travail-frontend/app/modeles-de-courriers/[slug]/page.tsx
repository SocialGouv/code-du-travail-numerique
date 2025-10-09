import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  fetchModel,
  getTitle,
  LetterModel,
} from "../../../src/modules/modeles-de-courriers";
import { notFound } from "next/navigation";
import { fetchRelatedItems } from "../../../src/modules/documents";

export async function generateMetadata(props) {
  const params = await props.params;
  const { title, type, metaDescription, meta_title } = await getModel(
    params.slug,
    ["title", "meta_title", "type", "metaDescription"]
  );
  const category = `Modèle ${type !== "fichier" ? `de ${type}` : "à télécharger"}`;

  return generateDefaultMetadata({
    title: `${category} : ${meta_title ?? title}`,
    description: metaDescription,
    path: `/modeles-de-courriers/${params.slug}`,
  });
}

async function ModeleCourrier(props) {
  const params = await props.params;
  const { title, ...model } = await getModel(params.slug, [
    "breadcrumbs",
    "title",
    "date",
    "html",
    "filename",
    "filesize",
    "intro",
  ]);

  const relatedItems = await fetchRelatedItems({ _id: model._id }, params.slug);

  return (
    <DsfrLayout>
      <LetterModel
        title={getTitle(params.slug, title)}
        {...model}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getModel = async (slug: string, fields) => {
  const model = await fetchModel({ slug }, fields);

  if (!model) {
    return notFound();
  }
  return model;
};
export default ModeleCourrier;
